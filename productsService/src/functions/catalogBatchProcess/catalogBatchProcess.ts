import { v4 as uuidv4 } from 'uuid';
import type { SQSHandler } from 'aws-lambda';
import { PublishCommand } from '@aws-sdk/client-sns';
import { DeleteMessageBatchCommand } from '@aws-sdk/client-sqs';
import { productsService } from '@services/products';
import { ProductWithCountWithoutId } from '@models/products';
import { sqsClient } from '@libs/sqs';
import { snsClient } from '@libs/sns';

export const main: SQSHandler = async (event) => {
    try {
        console.log('Getting all products from the queue. Records length', JSON.stringify(event.Records));
        const productsWithAmount: ProductWithCountWithoutId[] = event.Records.map((item) => JSON.parse(item.body));

        console.log('Saving all the products to DB', JSON.stringify(productsWithAmount));
        await productsService.bulkCreate(productsWithAmount);

        console.log('Deleting messages from queue');

        await sqsClient.send(
            new DeleteMessageBatchCommand({
                QueueUrl: process.env.QUEUE_URL,
                Entries: event.Records.map((item) => ({ Id: uuidv4(), ReceiptHandle: item.receiptHandle }))
            })
        );

        console.log('Sending notification to creators email');

        await snsClient.send(
            new PublishCommand({
                TopicArn: process.env.CREATE_PRODUCT_TOPIC_ARN,
                Message: `Products have been loaded! Date: ${new Date()}`,
                MessageAttributes: {
                    isBYDLoaded: {
                        DataType: 'String',
                        StringValue: productsWithAmount.find((item) => item.title === 'BYD') ? 'yes' : 'no'
                    }
                }
            })
        );
    } catch (e) {
        console.error('Failed to process products from SQS queue! ', e);
    }
};
