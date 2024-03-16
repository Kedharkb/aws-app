import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import {ApiStack} from '../stacks/api-stack'

export class AwsAppStage extends cdk.Stage {

    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);
      
      this.createApiStack(props)

    }
      private createApiStack(props?: cdk.StageProps): cdk.Stack {
        return new ApiStack(this, "ApiStack", {
          ...props,
        })
      }
    

   
}