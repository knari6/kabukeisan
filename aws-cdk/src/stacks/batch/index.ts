import { CfnOutput, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import path = require("path");

export class BatchStack extends Stack {
  constructor(scope: Construct) {
    super(scope, "BatchStack");
  }
}
