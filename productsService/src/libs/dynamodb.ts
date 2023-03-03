import { DynamoDB } from '@aws-sdk/client-dynamodb';

export const db = new DynamoDB({ region: 'eu-west-1' });

export * from  '@aws-sdk/client-dynamodb';
export * from '@aws-sdk/util-dynamodb';
