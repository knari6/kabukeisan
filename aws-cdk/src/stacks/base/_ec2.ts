import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import { Construct } from "constructs";
import { SecurityGroups } from "./_sg";

export class EC2Instance {
  constructor(scope: Construct, vpc: ec2.Vpc, sg: SecurityGroups) {
    const ec2SSMRole = new iam.Role(scope, "EC2SSMRole", {
      roleName: "EC2SSMRole",
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AmazonEC2RoleforSSM"
        ),
      ],
    });
    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      "sudo dnf -y install https://dev.mysql.com/get/mysql84-community-release-el9-1.noarch.rpm",
      "sudo dnf -y install mysql mysql-community-client",
      "sudo dnf -y install mysql-community-server"
    );
    userData.addCommands(
      "sudo yum install -y amazon-ssm-agent", // SSMエージェントのインストール
      "sudo systemctl enable amazon-ssm-agent",
      "sudo systemctl start amazon-ssm-agent"
    );
    const instance = new ec2.Instance(scope, "BastionInstnce", {
      vpc,
      securityGroup: sg.ec2,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2023,
      }),
      role: ec2SSMRole,
      userData,
    });

    const stopInstanceRule = new events.Rule(scope, "StopInstanceRule", {
      schedule: events.Schedule.cron({ minute: "0", hour: "0" }), // Adjust the cron expression as needed
    });
  }

  private stopEC2Instance(
    scope: Construct,
    instance: ec2.Instance,
    vpc: ec2.Vpc,
    sg: SecurityGroups
  ) {
    const stopInstanceRole = new iam.Role(scope, "StopInstanceRole", {
      roleName: "StopInstanceRole",
      assumedBy: new iam.ServicePrincipal("scheduler.amazonaws.com"),
      managedPolicies: [
        new iam.ManagedPolicy(scope, "StopInstancePolicy", {
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              resources: ["*"],
              actions: ["ec2:StopInstances"],
            }),
          ],
        }),
      ],
    });
    const stopInstanceRule = new events.Rule(scope, "StopInstanceRule", {
      schedule: events.Schedule.cron({ minute: "0", hour: "12" }),
    });
  }
}
