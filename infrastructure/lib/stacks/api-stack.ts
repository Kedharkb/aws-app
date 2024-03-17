import * as cdk from 'aws-cdk-lib';
import {Duration} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Runtime, Code, LayerVersion } from 'aws-cdk-lib/aws-lambda';

export class ApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
    
      const pythonlayer = new LayerVersion(this,'PythonLayer',{
        code: Code.fromAsset('../src/lambdas/api_lambda/'),
        layerVersionName: `api-lambda-layer`,
        description: "Layer for api Lambda python dependencies",
        compatibleRuntimes: [Runtime.PYTHON_3_10],
      })

    new Function(this, 'ApiLambda', {
        runtime: Runtime.PYTHON_3_10,
        handler: 'api_lambda.app.lambda_handler',
        code: Code.fromAsset('../src/lambdas/api_lambda/'),
        timeout: Duration.minutes(5),
        layers:[pythonlayer]
      });
    }
}

