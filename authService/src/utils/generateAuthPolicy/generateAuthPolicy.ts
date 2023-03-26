import { AuthEffectsUnion } from '@localtypes/authEffects';

export const generateAuthPolicy = (principalId: string, effect: AuthEffectsUnion, resource: string = '') => {
    // see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-lambda-authorizer-output.html
    const policyDoc = {
        principalId: principalId || 'anonymous',
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }
            ]
        }
    };

    return policyDoc;
};
