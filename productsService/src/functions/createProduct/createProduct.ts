import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { HttpStatusCodes } from '@localtypes/httpStatusCodes';
import { productsService, ProductWithAmount } from '@services/products';
import { shema } from './shema';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof shema> = async (event) => {
    const product = await productsService.create(event.body as Omit<ProductWithAmount, 'id'>);

    return formatJSONResponse(product, HttpStatusCodes.Created);
};
