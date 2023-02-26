import { v4 as uuidv4 } from 'uuid';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { HttpErrorBody } from '@localtypes/httpErrorBody';
import { HttpStatusCodes } from '@localtypes/httpStatusCodes';
import { productsModel } from '@models/products';

export const main: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {
  const { id } = event.pathParameters;

  const product = await productsModel.getById(id);

  if (product) {
    return formatJSONResponse(product);
  } else {
    const errorBody: HttpErrorBody = {
      message: 'Product with such id not found!',
      uuid: uuidv4()
    };

    return formatJSONResponse(errorBody, HttpStatusCodes.NotFound);
  }
};