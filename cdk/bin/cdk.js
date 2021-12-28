#!/usr/bin/env node
require("dotenv").config();

const cdk = require("aws-cdk-lib");
const { CdkStack } = require("../lib/cdk-stack");

const { ENV_ID } = process.env;

if (ENV_ID === undefined)
  console.log("Missing environment variable mapping: ENV_ID.");

const app = new cdk.App();

new CdkStack(app, `cdk-react-stack-${ENV_ID || "test"}`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
