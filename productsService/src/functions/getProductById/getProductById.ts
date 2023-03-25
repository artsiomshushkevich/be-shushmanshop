import { v4 as uuidv4 } from 'uuid';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import type { HttpErrorBody } from '@localtypes/httpErrorBody';
import { HttpStatusCodes } from '@localtypes/httpStatusCodes';
import { productsService } from '@services/products';
import { createHttpErrorResponseObject } from '@utils/createHttpErrorResponseObject/createHttpErrorResponseObject';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {
    try {
        const { id } = event.pathParameters;

        console.log(
            'Getting specific product started. The product id is %s. Parameters are %s',
            id,
            JSON.stringify(event.queryStringParameters)
        );

        const product = await productsService.getById(id);

        if (product) {
            return formatJSONResponse(product);
        } else {
            const notFoundMesssage = 'Product with such id not found!';
            const notFoundUuid = uuidv4();

            console.log(`${notFoundMesssage} The product id is ${id}. UUID: ${notFoundUuid}.`);

            const errorBody: HttpErrorBody = {
                message: notFoundMesssage,
                uuid: notFoundUuid
            };

            return formatJSONResponse(errorBody, HttpStatusCodes.NotFound);
        }
    } catch (e) {
        const errorUuid = uuidv4();

        console.error('Getting specific product failed. UUID: %s', errorUuid, e);

        return formatJSONResponse(
            createHttpErrorResponseObject('Smth went wrong!', errorUuid),
            HttpStatusCodes.ServerError
        );
    }
};
