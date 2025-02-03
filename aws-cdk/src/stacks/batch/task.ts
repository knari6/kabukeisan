import * as cdk from "aws-cdk-lib";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as logs from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import { VPC } from "../base/_vpc";
import { SecurityGroups } from "../base/_sg";
import { ECRRepository } from "../ecr";
import { Rds } from "../base/_rds";
import { config, Stage } from "../common/config";

export class Task {
  public readonly fargateTask: ecs.FargateTaskDefinition;
  public readonly env: Required<cdk.Environment>;
  constructor(
    construct: Construct,
    vpc: VPC,
    securityGroups: SecurityGroups,
    repository: ECRRepository,
    rds: Rds,
    stage: Stage
  ) {
    this.env = config(stage).env;
    // ロールの作成
    const executionRole = new iam.Role(construct, "TaskExecutionRole", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
      // タスク実行ポリシーの付与
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AmazonECSTaskExecutionRolePolicy"
        ),
      ],
    });
    const taskDefinition = new ecs.FargateTaskDefinition(
      construct,
      "kabukeisan-batch-task-definition",
      {
        cpu: 512,
        memoryLimitMiB: 2048,
        executionRole,
      }
    );

    const logGroup = new logs.LogGroup(
      construct,
      "kabukeisan-batch-log-group",
      {
        logGroupName: `/ecs/${taskDefinition.family}`,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

    const databaseSecret = rds.secret;
    taskDefinition.addContainer("kabukeisan-batch-container", {
      image: ecs.ContainerImage.fromEcrRepository(
        repository.repository("kabukeisan-batch")
      ),
      logging: ecs.LogDrivers.awsLogs({
        logGroup,
        streamPrefix: "kabukeisan-batch-",
      }),
      secrets: {
        DB_USER: ecs.Secret.fromSecretsManager(databaseSecret, "username"),
        DB_PASSWORD: ecs.Secret.fromSecretsManager(databaseSecret, "password"),
        DB_HOST: ecs.Secret.fromSecretsManager(databaseSecret, "host"),
        DB_PORT: ecs.Secret.fromSecretsManager(databaseSecret, "port"),
        DB_NAME: ecs.Secret.fromSecretsManager(databaseSecret, "dbname"),
      },
    });
    taskDefinition.addToTaskRolePolicy(
      new iam.PolicyStatement({
        resources: [
          `arn:aws:ssm${this.env.region}:${this.env.account}:parameter/*`,
        ],
        actions: ["ssm:GetParameter"],
      })
    );

    const cluster = new ecs.Cluster(construct, "kabukeisan-batch-cluster", {
      vpc: vpc.vpc,
    });

    new cdk.CfnOutput(construct, "kabukeisan-batch-cluster-name", {
      value: taskDefinition.taskDefinitionArn,
    });
  }

  private execTask(
    construct: Construct,
    task: ecs.FargateTaskDefinition,
    cluster: ecs.Cluster,
    vpc: VPC,
    securityGroups: SecurityGroups
  ): void {
    const taskRole = new iam.Role(construct, "TaskRole", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
    });

    const taskPolicy = new iam.Policy(construct, "TaskPolicy", {
      statements: [
        new iam.PolicyStatement({
          sid: "execFargateTask",
          effect: iam.Effect.ALLOW,
          actions: ["ecs:RunTask"],
          resources: [task.taskDefinitionArn],
        }),
        new iam.PolicyStatement({
          resources: [
            `arn:aws:ssm:${this.env.region}:${this.env.account}:parameter/*`,
          ],
        }),
      ],
    });
    taskRole.attachInlinePolicy(taskPolicy);
  }
}
