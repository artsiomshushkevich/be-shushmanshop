import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { products } from '@mocks/products';

export const main: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {
  const { id } = event.pathParameters;

  const product = products.find(item => item.id === id);

  return formatJSONResponse(product);
};