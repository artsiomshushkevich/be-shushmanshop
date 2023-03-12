import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { productsModel } from '@models/products';

export const getProductList: ValidatedEventAPIGatewayProxyEvent<null> = async () => {
    const products = await productsModel.getList();

    return formatJSONResponse(products);
};
