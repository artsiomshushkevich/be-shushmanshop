jest.mock('@aws-sdk/s3-request-presigner');

import { S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ImportService } from './importService';

describe('ImportService.generatePresignedPutUrl', () => {
    test('Should be called with correct params and return string url', async () => {
        const urlToReturn = 'https://aws.presignedurl.com';
        // @ts-ignore
        getSignedUrl.mockReturnValue(Promise.resolve(urlToReturn));

        const importService = new ImportService('eu-central-1');

        const result = await importService.generatePresignedPutUrl({ Bucket: 'test', Key: 'test.csv' });

        expect(result).toBe(urlToReturn);
        // @ts-ignore
        expect(getSignedUrl.mock.calls[0][0] instanceof S3Client).toBeTruthy();
        // @ts-ignore
        expect(getSignedUrl.mock.calls[0][1].input).toEqual({
            Bucket: 'test',
            Key: 'uploaded/test.csv'
        });
    });
});
