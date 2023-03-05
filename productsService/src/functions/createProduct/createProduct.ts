import { v4 as uuidv4 } from 'uuid';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { HttpStatusCodes } from '@localtypes/httpStatusCodes';
import { productsService, ProductWithCount } from '@services/products';
import { shema } from './shema';
import { createHttpErrorResponseObject } from '@utils/createHttpErrorResponseObject/createHttpErrorResponseObject';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof shema> = async (event) => {
    try {
        console.log('Creation of the product started. The product is %s', JSON.stringify(event.body));

        const product = await productsService.create(event.body as Omit<ProductWithCount, 'id'>);

        return formatJSONResponse(product, HttpStatusCodes.Created);
    } catch (e) {
        const uuid = uuidv4();
        console.error('Product creation has been failed. UUID: %s', uuid, e);

        return formatJSONResponse(createHttpErrorResponseObject('Smth went wrong!', uuid), HttpStatusCodes.ServerError);
    }
};
