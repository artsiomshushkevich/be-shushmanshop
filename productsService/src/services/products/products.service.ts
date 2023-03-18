import { v4 as uuidv4 } from 'uuid';
import { productsModel, productsMySqlModel, ProductWithCount } from '@models/products';
import { stocksModel, stocksMySqlModel } from '@models/stocks';
import { DbMode } from '@localtypes/dbMode';

export const productsService = {
    getList: async (dbMode: DbMode = 'mysql'): Promise<ProductWithCount[]> => {
        if (dbMode === 'mysql') {
            const result = await productsMySqlModel.getList();
            return result;
        }

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
    getById: async (id: string, dbMode: DbMode = 'mysql'): Promise<ProductWithCount | null> => {
        if (dbMode === 'mysql') {
            const result = await productsMySqlModel.getById(id);
            return result;
        }

        const product = await productsModel.getById(id);
        const stock = await stocksModel.getProductId(id);

        return product ? { ...product, count: stock ? stock.count : 0 } : null;
    },
    create: async (product: Omit<ProductWithCount, 'id'>, dbMode: DbMode = 'mysql'): Promise<ProductWithCount> => {
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

        if (dbMode === 'mysql') {
            await productsMySqlModel.create(newProduct);
            await stocksMySqlModel.create(newStock);
        } else {
            await productsModel.create(newProduct);
            await stocksModel.create(newStock);
        }

        return newProductWithCount;
    }
};
