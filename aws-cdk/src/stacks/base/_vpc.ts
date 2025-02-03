import { IpAddresses, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class VPC {
  public readonly vpc: Vpc;
  constructor(scope: Construct) {
    this.vpc = new Vpc(scope, "Vpc", {
      ipAddresses: IpAddresses.cidr("10.0.0.0/16"),
      enableDnsSupport: true,
      enableDnsHostnames: true,
      maxAzs: 2,
      reservedAzs: 1,
      subnetConfiguration: [
        {
          name: "Public",
          cidrMask: 20,
          subnetType: SubnetType.PUBLIC,
        },
        {
          name: "Private",
          cidrMask: 20,
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          name: "Isolated",
          cidrMask: 20,
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      ],
      restrictDefaultSecurityGroup: true,
    });
  }
}
