import { v4 as uuidv4 } from 'uuid';
import { middyfy } from '@libs/lambda';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { HttpStatusCodes } from '@localtypes/httpStatusCodes';
import { createHttpErrorResponseObject } from '@utils/createHttpErrorResponseObject/createHttpErrorResponseObject';

export const importProductsFile: ValidatedEventAPIGatewayProxyEvent<null> = async (_event) => {
    try {
        console.log(
            'Importing started'
        );

        return formatJSONResponse({message: 'importing...'}, HttpStatusCodes.Created);
    } catch (e) {
        const uuid = uuidv4();
        console.error('Importing products has been failed. UUID: %s', uuid, e);

        return formatJSONResponse(createHttpErrorResponseObject('Smth went wrong!', uuid), HttpStatusCodes.ServerError);
    }
};

export const main = middyfy(importProductsFile);
