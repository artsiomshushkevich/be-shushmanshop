import { handlerPath } from '@libs/handler-resolver';
import { LamdaConfig } from '@libs/types';

export const getProductList: LamdaConfig = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'product/available',
                cors: true
            }
        }
    ]
};
