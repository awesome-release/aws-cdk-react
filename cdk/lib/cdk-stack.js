require("dotenv").config();
const cdk = require("aws-cdk-lib");
const api = require("aws-cdk-lib/aws-apigateway");
const lambda = require("aws-cdk-lib/aws-lambda");

const path = require("path");

const { NASA_API_KEY } = process.env;

if (NASA_API_KEY === undefined)
  throw Error("Missing required environment variable: NASA_API_KEY.");

class CdkStack extends cdk.Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const nasaRestApi = new api.RestApi(this, "nasa-rest-api", {
      defaultCorsPreflightOptions: {
        allowHeaders: ["Content-Type"],
        allowMethods: ["GET"],
        allowOrigins: ["*"],
      },
    });

    const nasaLambda = new lambda.Function(this, "nasa-lambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.main",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../lambda/nasa-fetch/bundle.zip")
      ),
      environment: {
        NASA_API_KEY: NASA_API_KEY,
      },
    });

    nasaRestApi.root.addMethod(
      "GET",
      new api.LambdaIntegration(nasaLambda, { proxy: true })
    );

    new cdk.CfnOutput(this, "apiUrl", { value: nasaRestApi.url });
  }
}

module.exports = { CdkStack };
