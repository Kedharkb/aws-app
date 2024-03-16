import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import * as sm from 'aws-cdk-lib/aws-secretsmanager';
import {AwsAppStage} from './stages/aws-app'
export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'aws-app',
      synth: new ShellStep('SynthStep', {
          input: CodePipelineSource.gitHub(
            `Kedharkb/aws-app`,
            'master'
          ),
          primaryOutputDirectory: "infrastructure/cdk.out",
          commands: [
              'cd infrastructure',
              'npm ci',
              'npm run build',
              'npx cdk synth'
          ],
      }),
  });

  const backendStage = new AwsAppStage(
    this,
   "AwsAppStage",
    {
      env:{
        account: '381492264897',
        region: 'eu-central-1'
      }
    }
  );

  pipeline.addStage(backendStage)
   

  }
}
