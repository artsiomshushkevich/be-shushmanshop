import { v4 as uuidv4 } from 'uuid';
import type { SQS } from '@aws-sdk/client-sqs';

export const main = async (event) => {
    console.log(event);
    // try {
    //     console.log(
    //         'Creation of the product started. The product is %s. Params are %s. ',
    //         JSON.stringify(event.body),
    //         JSON.stringify(event.queryStringParameters)
    //     );
    //     const product = await productsService.create(
    //         event.body as Omit<ProductWithCount, 'id'>,
    //         (event.queryStringParameters?.dbMode as DbMode) || 'mysql'
    //     );
    //     return formatJSONResponse(product, HttpStatusCodes.Created);
    // } catch (e) {
    //     const uuid = uuidv4();
    //     console.error('Product creation has been failed. UUID: %s', uuid, e);
    //     return formatJSONResponse(createHttpErrorResponseObject('Smth went wrong!', uuid), HttpStatusCodes.ServerError);
    // }
};
