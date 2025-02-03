import { IRepository, Repository, TagMutability } from "aws-cdk-lib/aws-ecr";
import { Construct } from "constructs";
import { RemovalPolicy, Stack } from "aws-cdk-lib";

export type StageType = "dev" | "prod" | "stg" | "";
type RepositoryName = "kabukeisan-app" | "kabukeisan-batch";
export class ECRRepository extends Stack {
  private readonly repo: { [key in RepositoryName]?: IRepository } = {};

  constructor(scope: Construct, stage: StageType) {
    super(scope, "ECRStack");
    this.configureRepository(this, "kabukeisan-app", stage);
    this.configureRepository(this, "kabukeisan-batch", stage);
  }
  /**
   * repository
   */
  public repository(name: RepositoryName): IRepository {
    const repo = this.repo[name];
    if (repo === null || repo === undefined)
      throw new Error(`repository not found ${name}`);
    return repo;
  }

  /**
   * ECRのレポジトリの側だけ作成(ImageはGithubActionsからプッシュさせる)
   * @param scope
   * @param name
   */
  private configureRepository(
    scope: Construct,
    name: RepositoryName,
    stage: StageType
  ): void {
    this.repo[name] = new Repository(scope, `ecr.Repository ${name}`, {
      repositoryName: name,
      imageTagMutability: TagMutability.IMMUTABLE,
      removalPolicy: RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
      emptyOnDelete: stage === "dev",
    });
  }
}
