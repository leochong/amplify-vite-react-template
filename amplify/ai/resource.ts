import { defineFunction, NodejsVersion } from '@aws-amplify/backend';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export const chatFunction = defineFunction({
  name: 'chatFunction',
  entry: './handler/index.ts',
  runtime: NodejsVersion.NODEJS_18_X,
  permissions: [
    new PolicyStatement({
      actions: [
        'bedrock:InvokeModel',
        'bedrock:InvokeModelWithResponseStream'
      ],
      resources: ['*']
    })
  ]
});