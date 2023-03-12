import { v4 as uuidv4 } from 'uuid';
import { middyfy } from '@libs/lambda';
import type { ValidatedAPIGatewayLambda } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { HttpStatusCodes } from '@localtypes/httpStatusCodes';
import { createHttpErrorResponseObject } from '@utils/createHttpErrorResponseObject/createHttpErrorResponseObject';
import { ImportService } from '@services/import';

export const importProductsFile: ValidatedAPIGatewayLambda<null> = async (event) => {
    try {
        console.log('Importing started... Query string params are %s', JSON.stringify(event.queryStringParameters));
        const service = new ImportService(process.env.REGION);

        const link = await service.generatePresignedPutUrl({
            Bucket: process.env.UPLOAD_BUCKET,
            Key: event.queryStringParameters.name
        });

        return formatJSONResponse({ link }, HttpStatusCodes.Created);
    } catch (e) {
        const uuid = uuidv4();
        console.error('Importing products has been failed. UUID: %s', uuid, e);

        return formatJSONResponse(createHttpErrorResponseObject('Smth went wrong!', uuid), HttpStatusCodes.ServerError);
    }
};

export const main = middyfy(importProductsFile);
