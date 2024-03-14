import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import * as sm from 'aws-cdk-lib/aws-secretsmanager';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const secret = sm.Secret.fromSecretAttributes(this, "ImportedSecret", {
      secretCompleteArn: "arn:aws:secretsmanager:eu-central-1:381492264897:secret:github-token-AzXgoT"
    });

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'WorkshopPipeline',
      synth: new ShellStep('SynthStep', {
          input: CodePipelineSource.gitHub(
            `kedharkb/aws-app`,
            'master',
            {
              authentication:secret.secretValue
            }
          ),
          commands: [
              'cd infrastructure',
              'npm ci',
              'npm run build',
              'npx cdk synth'
          ],
      }),
  });

  
  }
}