import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { productsService } from '@services/products';

export const getProductList: ValidatedEventAPIGatewayProxyEvent<null> = async () => {
    const products = await productsService.getList();

    return formatJSONResponse(products);
};
