import { setUpConnection, query } from '@libs/mysql';
import { Product, ProductWithCount } from './product.types';

const SELECT_ALL = `
    SELECT products.id, products.title, products.description, products.price, stocks.count
    FROM products
    INNER JOIN stocks
    ON products.id = stocks.productId
`;

const SELECT_BY_ID = `
    ${SELECT_ALL}
    WHERE products.id = ?
`;

const INSERT = `
    INSERT INTO products (id, title, description, price)
    VALUES
        (?, ?, ?, ?);
`;

const BULK_INSERT = `
    INSERT INTO products (id, title, description, price)
    VALUES ?
`;

export const productsModel = {
    getList: async (): Promise<ProductWithCount[]> => {
        const connectionObj = await setUpConnection();

        const results = await query(connectionObj.get(), SELECT_ALL);

        connectionObj.release();

        return results as ProductWithCount[];
    },
    getById: async (id: string): Promise<ProductWithCount | null> => {
        const connectionObj = await setUpConnection();

        const results = await query(connectionObj.get(), SELECT_BY_ID, [id]);

        connectionObj.release();

        return results?.[0] || null;
    },
    create: async (product: Product): Promise<boolean> => {
        const { id, title, description, price } = product;
        const connectionObj = await setUpConnection();

        await query(connectionObj.get(), INSERT, [id, title, description, price]);

        connectionObj.release();

        return true;
    },
    bulkCreate: async (products: Product[]): Promise<boolean> => {
        const productsToInsert = products.reduce((acc, currVal) => {
            const { id, title, description, price } = currVal;

            return [...acc, [id, title, description, price]];
        }, []);

        const connectionObj = await setUpConnection();

        await query(connectionObj.get(), BULK_INSERT, productsToInsert);

        connectionObj.release();

        return true;
    }
};
