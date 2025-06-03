import { defineFunction } from '@aws-amplify/backend';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export const chatFunction = defineFunction({
  name: 'chatFunction',
  handler: 'index.handler',
  runtime: 'nodejs18.x',
  memorySize: 1024,
  timeout: 30,
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