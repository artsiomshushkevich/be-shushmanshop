import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import { HttpStatusCodes, HttpStatusCodesUnion } from '@localtypes/httpStatusCodes';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
    body: FromSchema<S>;
};

export type ValidatedAPIGatewayLambda<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;

export const formatJSONResponse = (
    response: Record<string, unknown> | Array<unknown>,
    statusCode: HttpStatusCodesUnion = HttpStatusCodes.Success
) => {
    return {
        statusCode,
        body: JSON.stringify(response)
    };
};
