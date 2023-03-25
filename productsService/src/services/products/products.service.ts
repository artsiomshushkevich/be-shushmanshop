import { v4 as uuidv4 } from 'uuid';
import { Product, productsModel, ProductWithCount, ProductWithCountWithoutId } from '@models/products';
import { Stock, stocksModel } from '@models/stocks';

export const productsService = {
    getList: async (): Promise<ProductWithCount[]> => {
        const result = await productsModel.getList();
        return result;
    },
    getById: async (id: string): Promise<ProductWithCount | null> => {
        const result = await productsModel.getById(id);
        return result;
    },
    create: async (product: ProductWithCountWithoutId): Promise<ProductWithCount> => {
        const id: string = uuidv4();
        const { title, description, price, count } = product;

        const newProduct = {
            id,
            title,
            description,
            price
        };

        const newProductWithCount = { ...newProduct, count: count || 0 };

        const newStock = {
            productId: id,
            count: count || 0
        };

        await productsModel.create(newProduct);
        await stocksModel.create(newStock);

        return newProductWithCount;
    },
    bulkCreate: async (products: Array<ProductWithCountWithoutId>): Promise<ProductWithCount[]> => {
        const productsToCreate: Product[] = [];
        const stocksToCreate: Stock[] = [];
        const productsWithCount: ProductWithCount[] = [];

        products.forEach((item) => {
            const id: string = uuidv4();
            const { title, description, price, count } = item;
            const formattedCount = count || 0;

            const newProduct: Product = {
                id,
                title,
                description,
                price
            };

            const newProductWithCount: ProductWithCount = { ...newProduct, count: formattedCount };

            const newStock: Stock = {
                productId: id,
                count: formattedCount
            };

            productsToCreate.push(newProduct);
            stocksToCreate.push(newStock);
            productsWithCount.push(newProductWithCount);
        });

        await productsModel.bulkCreate(productsToCreate);
        await stocksModel.bulkCreate(stocksToCreate);

        return productsWithCount;
    }
};
