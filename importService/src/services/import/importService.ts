import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    CopyObjectCommand,
    DeleteObjectCommand
} from '@aws-sdk/client-s3';
import { SQSClient, SendMessageCommand, SendMessageCommandInput } from '@aws-sdk/client-sqs';
import csv from 'csv-parser';
import type { BasicS3Config } from '@libs/s3';

export class ImportService {
    #region = '';
    #s3Client: S3Client = null;
    #sqsClient: SQSClient = null;

    getRegion() {
        return this.#region;
    }

    setRegion(region: string) {
        this.#region = region;
    }

    getS3Client() {
        return this.#s3Client;
    }

    setS3Client(s3Client: S3Client) {
        this.#s3Client = s3Client;
    }

    getSqsClient() {
        return this.#sqsClient;
    }

    setSqsClient(sqsClient: SQSClient) {
        this.#sqsClient = sqsClient;
    }

    constructor(region: string) {
        this.setRegion(region);

        this.setS3Client(
            new S3Client({
                region
            })
        );

        this.setSqsClient(
            new SQSClient({
                region
            })
        );
    }

    async generatePresignedPutUrl(config: BasicS3Config, expiresIn = 3600) {
        const command = new PutObjectCommand({
            Bucket: config.Bucket,
            Key: `uploaded/${config.Key}`
        });

        const url = await getSignedUrl(this.getS3Client(), command, { expiresIn });

        return url;
    }

    async streamAndMoveCsvFile(config: BasicS3Config) {
        const command = new GetObjectCommand(config);

        const item = await this.getS3Client().send(command);

        return new Promise((onResolve, onReject) => {
            const csvFileStreamingUuid = uuidv4();
            let index = 0;

            // @ts-ignore
            item.Body.pipe(csv())
                .on('data', async (data) => {
                    console.log('Sending data to SQS', data);
                    this.getSqsClient().send(
                        new SendMessageCommand({
                            QueueUrl: process.env.QUEUE_URL,
                            MessageBody: JSON.stringify(data),
                            MessageDeduplicationId: `${index++}`,
                            MessageGroupId: csvFileStreamingUuid
                        })
                    );
                })
                .on('end', async () => {
                    try {
                        console.log('Copying file to parsed/ folder...');

                        await this.getS3Client().send(
                            new CopyObjectCommand({
                                Bucket: config.Bucket,
                                CopySource: `${config.Bucket}/${config.Key}`,
                                Key: `parsed/${config.Key.split('/')[1]}`
                            })
                        );

                        console.log('Removing file from uploaded/ folder...');

                        await this.getS3Client().send(new DeleteObjectCommand(config));

                        onResolve(true);
                    } catch (e) {
                        onReject(e);
                    }
                });
        });
    }
}
