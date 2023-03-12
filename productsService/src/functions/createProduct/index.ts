import { handlerPath } from '@libs/handler-resolver';
import type { LamdaConfig } from '@libs/types';
import { shema } from './shema';

export const createProduct: LamdaConfig = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'product',
                cors: true,
                request: {
                    schemas: {
                        'application/json': shema
                    }
                }
            }
        }
    ]
};
