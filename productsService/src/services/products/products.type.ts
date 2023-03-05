import type { Product } from '@models/products';

export type ProductWithCount = Product & { count: number };
