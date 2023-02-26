import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { products } from '@mocks/products';

export const main: ValidatedEventAPIGatewayProxyEvent<null> = async (_event) => {
  return formatJSONResponse(products);
};