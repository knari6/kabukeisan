import {
  ISecurityGroup,
  IVpc,
  Peer,
  Port,
  SecurityGroup,
} from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

interface SecurityGroupsProps {
  readonly vpc: IVpc;
}
export class SecurityGroups {
  public readonly alb: ISecurityGroup;
  public readonly app: ISecurityGroup;
  public readonly endpoint: ISecurityGroup;
  public readonly rds: ISecurityGroup;
  public readonly ec2: ISecurityGroup;
  constructor(scope: Construct, { vpc }: SecurityGroupsProps) {
    this.alb = new SecurityGroup(scope, "SG_ALB", {
      description: "security group for ALB",
      vpc,
      allowAllOutbound: true,
    });
    this.alb.addIngressRule(Peer.anyIpv4(), Port.HTTP);
    this.alb.addIngressRule(Peer.anyIpv4(), Port.HTTPS);

    this.app = new SecurityGroup(scope, "SG_APP", {
      description: "security group for APP",
      vpc,
      allowAllOutbound: true,
    });
    this.app.addIngressRule(this.alb, Port.tcp(3001));

    this.ec2 = new SecurityGroup(scope, "SG_EC2", {
      description: "security group for EC2",
      vpc,
      securityGroupName: "SG_EC2",
      allowAllOutbound: true,
    });

    this.endpoint = new SecurityGroup(scope, "SG_ENDPOINT", {
      description: "security group for VPC Endpoint",
      vpc,
      allowAllOutbound: true,
    });
    this.endpoint.addIngressRule(this.app, Port.tcp(443));

    this.rds = new SecurityGroup(scope, "SG_RDS", {
      description: "security group for RDS",
      vpc,
      allowAllOutbound: true,
    });
    this.rds.addIngressRule(this.app, Port.tcp(3306));
    this.rds.addIngressRule(this.ec2, Port.tcp(3306));
  }
}
