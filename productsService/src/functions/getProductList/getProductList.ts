import { v4 as uuidv4 } from 'uuid';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { productsService } from '@services/products';
import { HttpStatusCodes } from '@localtypes/httpStatusCodes';
import { createHttpErrorResponseObject } from '@utils/createHttpErrorResponseObject/createHttpErrorResponseObject';

export const getProductList: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {
    try {
        console.log(
            'Getting all the available products started. Params %s',
            JSON.stringify(event.queryStringParameters)
        );

        const products = await productsService.getList();

        return formatJSONResponse(products);
    } catch (e) {
        const uuid = uuidv4();
        console.error('Getting all the available products failed. UUID: %s', uuid, e);

        return formatJSONResponse(createHttpErrorResponseObject('Smth went wrong!', uuid), HttpStatusCodes.ServerError);
    }
};
