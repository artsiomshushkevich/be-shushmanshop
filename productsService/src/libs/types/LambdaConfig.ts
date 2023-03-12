import type { AWS } from '@serverless/typescript';

export type LamdaConfig = AWS['functions'][keyof AWS['functions']];
