import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const importService = {
    generatePresignedPutUrl: async (name: string, expiresIn = 3600) => {
        console.log('REGION', process.env.REGION);
        console.log('UPLOAD_BUCKET', process.env.UPLOAD_BUCKET);

        const client = new S3Client({
            region: process.env.REGION
        });

        const command = new PutObjectCommand({
            Bucket: process.env.UPLOAD_BUCKET,
            Key: `upload/${name}`
        });

        const url = await getSignedUrl(client, command, { expiresIn });

        return url;
    }
};
