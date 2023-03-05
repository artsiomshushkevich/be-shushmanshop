import { v4 as uuidv4 } from 'uuid';
import { productsModel } from '@models/products';
import { stocksModel } from '@models/stocks';
import type { ProductWithCount } from './products.type';

export const productsService = {
    getList: async (): Promise<ProductWithCount[]> => {
        const products = await productsModel.getList();
        const stocks = await stocksModel.getList();

        const productIdToAmountToMap = stocks.reduce(
            (acc, currVal) => ({ ...acc, [currVal.productId]: currVal.count }),
            {}
        );

        return products.map((item) => ({
            ...item,
            count: productIdToAmountToMap[item.id] || 0
        }));
    },
    getById: async (id: string): Promise<ProductWithCount | null> => {
        const product = await productsModel.getById(id);
        const stock = await stocksModel.getProductId(id);

        return product ? { ...product, count: stock ? stock.count : 0 } : null;
    },
    create: async (product: Omit<ProductWithCount, 'id'>): Promise<ProductWithCount> => {
        const id: string = uuidv4();
        const { title, description, price, count } = product;

        const newProduct = {
            id,
            title,
            description,
            price
        };

        await productsModel.create(newProduct);

        await stocksModel.create({
            productId: id,
            count: count || 0
        });

        return { ...newProduct, count };
    }
};
