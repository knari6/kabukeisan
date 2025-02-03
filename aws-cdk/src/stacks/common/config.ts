import type * as cdk from "aws-cdk-lib";

export type Stage = "dev" | "stg" | "prd";

export interface Config {
  readonly env: Required<cdk.Environment>;
  readonly stage: Stage;
  readonly hostedZone?: {
    readonly id: string;
    readonly name: string;
  };

  readonly certificateArn?: string[];
}

const CONFIG: { [stage in Stage]: Config } = {
  prd: {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT!,
      region: "ap-northeast-1",
    },
    stage: "prd",
  },
  stg: {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT!,
      region: "ap-northeast-1",
    },
    stage: "stg",
  },
  dev: {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT!,
      region: "ap-northeast-1",
    },
    stage: "dev",
  },
};

export function config(stage: Stage): Config {
  const config = CONFIG[stage];
  if (config == null) {
    throw new Error(`config is null or undefined`);
  }
  return config;
}
