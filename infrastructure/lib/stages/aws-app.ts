import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import {ApiStack} from '../stacks/api-stack'
import { Stack, Stage, StageProps } from "aws-cdk-lib";

export class AwsApp extends cdk.Stage {

    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);
      
      const apiStack = this.createApiStack(props)

    }

      private createApiStack(props?: StageProps): Stack {
        return new ApiStack(this, "OrdersStack", {
          ...props,
        })
      }
    

   
}