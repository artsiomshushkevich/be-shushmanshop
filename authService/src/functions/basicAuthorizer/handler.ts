import { v4 as uuidv4 } from 'uuid';
import { APIGatewayRequestIAMAuthorizerHandlerV2 } from 'aws-lambda';
import { generateAuthPolicy } from '@utils/generateAuthPolicy/generateAuthPolicy';
import { AuthEffectsUnion } from '@localtypes/authEffects';
import { parseBasicAuthHeader } from '@utils/parseBasicAuthHeader/parseBasicAuthHeader';

export const basicAuthorizer: APIGatewayRequestIAMAuthorizerHandlerV2 = async (event) => {
    try {
        console.log('Authorizing request...');

        let effect: AuthEffectsUnion = 'Deny';

        const user = parseBasicAuthHeader(event.headers.authorization);

        if (
            user &&
            user.username === process.env.GITHUB_ACCOUNT_NAME &&
            user.password === process.env[process.env.GITHUB_ACCOUNT_NAME]
        ) {
            effect = 'Allow';
        }

        const policy = generateAuthPolicy('importUser', effect, process.env.API_ARN_PATTERN);

        return policy;
    } catch (e) {
        const uuid = uuidv4();
        console.error('Authorizing reequest failed %s', uuid, e);
    }
};
