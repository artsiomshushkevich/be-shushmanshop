import type { Handler, S3CreateEvent } from 'aws-lambda';

export type S3CreateLambda = Handler<S3CreateEvent>;

export type BasicS3Config = {
    Bucket: string;
    Key: string;
};
