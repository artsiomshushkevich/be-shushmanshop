import { v4 as uuidv4 } from 'uuid';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import type { HttpErrorBody } from '@localtypes/httpErrorBody';
import { HttpStatusCodes } from '@localtypes/httpStatusCodes';
import { productsService } from '@services/products';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {
    const { id } = event.pathParameters;

    const product = await productsService.getById(id);

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
