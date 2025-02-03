import { Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import {
  AllowedMethods,
  CachedMethods,
  CachePolicy,
  Distribution,
  OriginAccessIdentity,
  PriceClass,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Effect, PolicyStatement, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class FrontendStack extends Stack {
  public readonly bucket: Bucket;
  public readonly distribution: Distribution;
  constructor(scope: Construct) {
    super(scope, "FrontendStack");
    const oai = new OriginAccessIdentity(this, "kabukeisan-oai");

    // バケット
    this.bucket = new Bucket(this, "KabukeisanFrontend", {
      bucketName: "kabukeisan",
      versioned: false,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });
    this.bucket.grantRead(oai);

    // ディストリビューション
    this.distribution = new Distribution(this, "Kabukeisan-Distribution", {
      defaultRootObject: "index.html",
      errorResponses: [
        {
          ttl: Duration.seconds(300),
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/index.html",
        },
        {
          ttl: Duration.seconds(300),
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: "/index.html",
        },
      ],
      defaultBehavior: {
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: CachedMethods.CACHE_GET_HEAD,
        cachePolicy: CachePolicy.CACHING_OPTIMIZED,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        origin: new S3Origin(this.bucket, {
          originAccessIdentity: oai,
        }),
      },
      priceClass: PriceClass.PRICE_CLASS_ALL,
    });

    // バケットポリシー
    const bucketPolicy = new PolicyStatement({
      sid: "AllowCloudFrontServicePrincipal",
      effect: Effect.ALLOW,
      principals: [new ServicePrincipal("cloudfront.amazonaws.com")],
      actions: ["s3:GetObject"],
      resources: [`${this.bucket.bucketArn}/*`],
      conditions: {
        StringEquals: {
          "AWS:SourceArn":
            "arn:aws:cloudfront::903556311003:distribution/E1WDY5DQA1643L",
        },
      },
    });
    this.bucket.addToResourcePolicy(bucketPolicy);
  }
}
