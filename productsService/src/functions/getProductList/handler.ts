import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productsModel } from '@models/products';

export const main: ValidatedEventAPIGatewayProxyEvent<null> = middyfy(async (_event) => {
  const products = await productsModel.getList();

  return formatJSONResponse(products);
});