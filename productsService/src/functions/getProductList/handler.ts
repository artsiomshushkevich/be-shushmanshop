import { middyfy } from '@libs/lambda';
import { getProductList } from './getProductList';

export const main = middyfy(getProductList);
