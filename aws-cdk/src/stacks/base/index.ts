import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { EC2Instance } from "./_ec2";
import { VPC } from "./_vpc";
import { SecurityGroups } from "./_sg";

export class BaseStack extends Stack {
  constructor(scope: Construct) {
    super(scope, "BaseStack");
    const vpc = new VPC(this);
    const sg = new SecurityGroups(this, { vpc: vpc.vpc });
    new EC2Instance(this, vpc.vpc, sg);
  }
}
