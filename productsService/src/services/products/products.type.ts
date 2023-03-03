import type { Product } from '@models/products';

export type ProductWithAmount = Product & { amount: number };