import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import csv from 'csv-parser';
import type { BasicS3Config } from '@libs/s3';

export class ImportService {
    #region = '';
    client: S3Client = null;

    getRegion() {
        this.#region;
    }

    setRegion(region: string) {
        this.#region = region;
    }

    constructor(region: string) {
        this.setRegion(region);

        this.client = new S3Client({
            region
        });
    }

    async generatePresignedPutUrl(config: BasicS3Config, expiresIn = 3600) {
        const command = new PutObjectCommand({
            Bucket: config.Bucket,
            Key: `upload/${config.Key}`
        });

        const url = await getSignedUrl(this.client, command, { expiresIn });

        return url;
    }

    async streamAndMoveCsvFile(config: BasicS3Config) {
        const command = new GetObjectCommand(config);

        const item = await this.client.send(command);

        return new Promise((onResolve) => {
            // @ts-ignore
            item.Body.pipe(csv())
                .on('data', (data) => console.log(`File ${config.Key}, data `, data))
                .on('end', () => onResolve(true));
        });
    }
}
