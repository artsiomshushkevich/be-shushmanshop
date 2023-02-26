import { products } from '@mocks/products';
import { Product } from './product.types';

export const productsModel = {
    getList: (): Promise<Product[]> => new Promise(( resolve ) => setTimeout(() => {
        resolve(products)
    }, 50)),

    getById: (id: string): Promise<Product | null> => new Promise(( resolve ) => setTimeout(() => {
        const product = products.find(item => item.id === id);

        resolve(product);
    }, 50))
}