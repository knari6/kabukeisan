#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FrontendStack } from "../src/stacks/frontend";
import { BatchStack } from "../src/stacks/batch";
import { ECSBatchStack } from "../src/stacks/ecs-batch";
import { ECRRepository } from "../src/stacks/ecr";
import { BaseStack } from "../src/stacks/base";

const app = new cdk.App();

// new FrontendStack(app);

new BatchStack(app);
new ECSBatchStack(app);
new ECRRepository(app, "dev");
new BaseStack(app);
