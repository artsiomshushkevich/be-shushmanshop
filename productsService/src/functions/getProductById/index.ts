import { handlerPath } from '@libs/handler-resolver';
import type { LamdaConfig } from '@libs/types';

export const getProductById: LamdaConfig = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'product/{id}'
      }
    }
  ]
};
