import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { HttpStatusCodes } from '@localtypes/httpStatusCodes';
import { productsService, ProductWithCount } from '@services/products';
import { shema } from './shema';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof shema> = async (event) => {
    const product = await productsService.create(event.body as Omit<ProductWithCount, 'id'>);

    return formatJSONResponse(product, HttpStatusCodes.Created);
};
