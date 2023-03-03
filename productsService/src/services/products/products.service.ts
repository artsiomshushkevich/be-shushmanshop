import { v4 as uuidv4 } from 'uuid';
import { productsModel } from '@models/products';
import { stocksModel } from '@models/stocks';
import type { ProductWithAmount } from './products.type';

export const productsService = {
    getList: async (): Promise<ProductWithAmount[]> => {
        const products = await productsModel.getList();
        const stocks = await stocksModel.getList();

        const productIdToAmountToMap = stocks.reduce(
            (acc, currVal) => ({ ...acc, [currVal.productId]: currVal.amount }),
            {}
        );

        return products.map((item) => ({
            ...item,
            amount: productIdToAmountToMap[item.id] || 0
        }));
    },
    getById: async (id: string): Promise<ProductWithAmount | null> => {
        const product = await productsModel.getById(id);
        const stock = await stocksModel.getProductId(id);

        return product ? { ...product, amount: stock ? stock.amount : 0 } : null;
    },
    create: async (product: Omit<ProductWithAmount, 'id'>): Promise<ProductWithAmount> => {
        const id: string = uuidv4();

        const newProduct = {
            id,
            ...product
        };

        await productsModel.create(newProduct);

        await stocksModel.create({
            productId: id,
            amount: 0
        });

        return newProduct;
    }
};
