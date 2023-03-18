import { v4 as uuidv4 } from 'uuid';
import type { SQSHandler } from 'aws-lambda';
import { DeleteMessageBatchCommand } from '@aws-sdk/client-sqs';
import { productsService } from '@services/products';
import { ProductWithCountWithoutId } from '@models/products';
import { sqsClient } from '@libs/sqs';

export const main: SQSHandler = async (event) => {
    try {
        console.log('Getting all products from the queue. Records length', JSON.stringify(event.Records));
        const productsWithAmount: ProductWithCountWithoutId[] = event.Records.map((item) => {
            const unformattedProduct = JSON.parse(item.body);

            return {
                title: unformattedProduct.title,
                description: unformattedProduct.description,
                price: +unformattedProduct.price,
                count: +unformattedProduct.count || 0
            };
        });

        console.log('Saving all the products to DB', JSON.stringify(productsWithAmount));
        await productsService.bulkCreate(productsWithAmount);

        console.log('Deleting messages from queue');

        await sqsClient.send(
            new DeleteMessageBatchCommand({
                QueueUrl: process.env.QUEUE_URL,
                Entries: event.Records.map((item) => ({ Id: uuidv4(), ReceiptHandle: item.receiptHandle }))
            })
        );
    } catch (e) {
        console.error('Failed to process products from SQS queue! ', e);
    }
};
