import { v4 as uuidv4 } from 'uuid';
import type { S3CreateLambda } from '@libs/s3';
import { ImportService } from '@services/import';

export const importFileParser: S3CreateLambda = async (event) => {
    try {
        console.log('Processing CSV files started...');
        const service = new ImportService(process.env.REGION);

        await Promise.all(
            event.Records.map((item) =>
                service.streamAndMoveCsvFile({
                    Bucket: item.s3.bucket.name,
                    Key: item.s3.object.key
                })
            )
        );

        console.log('Processing CSV files ended!');
    } catch (e) {
        const uuid = uuidv4();
        console.error('Processing CSV file failed! UUID: %s', uuid, e);
    }
};
