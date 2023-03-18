import { DynamoDB } from '@aws-sdk/client-dynamodb';

export const db = new DynamoDB({ region: process.env.REGION });

export * from '@aws-sdk/client-dynamodb';
export * from '@aws-sdk/util-dynamodb';
