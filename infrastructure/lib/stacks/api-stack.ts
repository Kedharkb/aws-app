import * as cdk from 'aws-cdk-lib';
import {Duration} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import {Role,ServicePrincipal} from 'aws-cdk-lib/aws-iam'

export class ApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

    const myRole = new Role(this, 'My Role', {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      });
      

    new Function(this, 'ApiLambda', {
        runtime: Runtime.PYTHON_3_10,
        handler: 'app.lambda_handler',
        code: Code.fromAsset('../src/lambdas/api_lambda/api_lambda'),
        role:myRole,
        timeout: Duration.minutes(5)
      });
    }
}