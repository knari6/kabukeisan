import {
  DatabaseInstance,
  DatabaseInstanceEngine,
  IInstanceEngine,
  IParameterGroup,
  MysqlEngineVersion,
  ParameterGroup,
  SubnetGroup,
} from "aws-cdk-lib/aws-rds";
import { ISecret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { VPC } from "./_vpc";
import { InstanceType, Vpc } from "aws-cdk-lib/aws-ec2";
import { SecurityGroups } from "./_sg";

interface Mysql {
  readonly databaseName: string;
  readonly secret: ISecret;
}

interface RdsProps {
  vpc: VPC;
  sg: SecurityGroups;
}

export class Rds implements Mysql {
  public readonly databaseName = "kabukeisan";
  private readonly engine: IInstanceEngine;
  private db: DatabaseInstance;
  constructor(scope: Construct, { vpc, sg }: RdsProps, stage: string) {
    this.engine = DatabaseInstanceEngine.mysql({
      version: MysqlEngineVersion.VER_8_0_39,
    });
    const parameterGroup = this.configureParameterGroup(scope);

    this.db = new DatabaseInstance(scope, "rds.DatabaseInstance", {
      engine: this.engine,
      instanceType: new InstanceType("t3.micro"),
      multiAz: false,
      vpc: vpc.vpc,
      vpcSubnets: { subnets: vpc.vpc.isolatedSubnets },
      securityGroups: [sg.rds],
      subnetGroup: this.configureSubnetGroup(scope, vpc.vpc),
      databaseName: this.databaseName,
      parameterGroup,
      cloudwatchLogsExports: ["error", "general", "slowquery", "audit"],
      preferredMaintenanceWindow: "Tue:18:00-Tue:18:30",
    });
  }
  public get secret(): ISecret {
    if (this.db.secret == null) {
      throw new Error("secret is null or undefined");
    }
    return this.db.secret;
  }

  private configureParameterGroup(scope: Construct): IParameterGroup {
    return new ParameterGroup(scope, "rds.ParameterGroup", {
      engine: this.engine,
      parameters: {
        character_set_client: "utf8mb4",
        character_set_connection: "utf8mb4",
        character_set_database: "utf8mb4",
        character_set_filesystem: "utf8mb4",
        character_set_results: "utf8mb4",
        character_set_server: "utf8mb4",
        collation_connection: "utf8mb4_ja_0900_as_cs_ks",
        collation_server: "utf8mb4_0900_as_cs_ks",
        general_log: "1",
        slow_query_log: "1",
        time_zone: "Asia/Tokyo",
      },
    });
  }

  private configureSubnetGroup(scope: Construct, vpc: Vpc): SubnetGroup {
    return new SubnetGroup(scope, "rds.SubnetGroup", {
      description: "Configuration of subnet group for rds",
      vpc,
      vpcSubnets: { subnets: vpc.isolatedSubnets },
    });
  }
}
