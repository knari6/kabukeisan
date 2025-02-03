import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { SecurityGroups } from "./_sg";

export class VpcEndpoint {
  constructor(scope: Construct, vpc: ec2.IVpc, securityGroups: SecurityGroups) {
    const securityGroup = [securityGroups.endpoint];

    new ec2.InterfaceVpcEndpoint(scope, "EC2Endpoint", {
      vpc: vpc,
      service: ec2.InterfaceVpcEndpointAwsService.EC2,
      subnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: securityGroup,
    });

    new ec2.InterfaceVpcEndpoint(scope, "SSM Endpoint", {
      vpc: vpc,
      service: ec2.InterfaceVpcEndpointAwsService.SSM,
      subnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: securityGroup,
    });

    new ec2.InterfaceVpcEndpoint(scope, "SSM_MESSAGES", {
      vpc: vpc,
      service: ec2.InterfaceVpcEndpointAwsService.SSM_MESSAGES,
      subnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: securityGroup,
    });
  }
}
