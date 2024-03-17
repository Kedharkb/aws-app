import * as cdk from 'aws-cdk-lib';
import {Duration} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Runtime, Code, LayerVersion } from 'aws-cdk-lib/aws-lambda';
import { PythonFunction } from "@aws-cdk/aws-lambda-python-alpha";

export class ApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
    

    new PythonFunction(this, 'ApiLambda', {
        runtime: Runtime.PYTHON_3_10,
        handler: 'lambda_handler',
        // code: Code.fromAsset('../src/lambdas/api_lambda/'),
        entry: "../src/lambdas/api_lambda",
        index: "main.py",
        timeout: Duration.minutes(5),
      });
    }
}

