import { middyfy } from '@libs/lambda';
import { getProductById } from './getProductById';

export const main = middyfy(getProductById);
