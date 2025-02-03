import * as cdk from "aws-cdk-lib";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as logs from "aws-cdk-lib/aws-logs";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import { Construct } from "constructs";
import { VPC } from "../base/_vpc";
import { SecurityGroups } from "../base/_sg";

export class Task extends cdk.Stack {
  constructor(scope: Construct, id: string, vpc: VPC, sg: SecurityGroups) {
    super(scope, id);

    // ECSクラスターを作成
    const cluster = new ecs.Cluster(scope, "EcsCluster", {
      vpc: vpc.vpc,
    });

    // ロググループを作成
    const logGroup = new logs.LogGroup(scope, "LogGroup", {
      retention: logs.RetentionDays.ONE_WEEK,
    });

    // タスク定義を作成
    const taskDefinition = new ecs.FargateTaskDefinition(scope, "TaskDef");

    // コンテナを追加
    const container = taskDefinition.addContainer("DefaultContainer", {
      image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
      memoryLimitMiB: 512,
      logging: ecs.LogDriver.awsLogs({
        logGroup,
        streamPrefix: "ecs",
      }),
    });

    // コンテナポートをマッピング
    container.addPortMappings({
      containerPort: 80,
    });

    // ECSサービスを作成
    new ecs.FargateService(this, "Service", {
      cluster,
      taskDefinition,
    });

    const rule = new events.Rule(this, "ScheduleRule", {
      schedule: events.Schedule.cron({
        minute: "0",
        hour: "4",
        weekDay: "MON-FRI",
      }),
    });

    // ターゲットとしてECSタスクを追加
    rule.addTarget(
      new targets.EcsTask({
        cluster,
        taskDefinition,
        taskCount: 1,
        subnetSelection: { subnets: cluster.vpc.privateSubnets },
      })
    );
  }
}
