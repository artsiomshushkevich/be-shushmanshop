import { setUpConnection, query } from '@libs/mysql';
import { Stock } from './stock.types';

const INSERT = `
    INSERT INTO stocks (productId, count)
    VALUES
        (?, ?)
`;

const BULK_INSERT = `
    INSERT INTO stocks (productId, count)
    VALUES ?
`;

export const stocksModel = {
    create: async (stock: Stock): Promise<boolean> => {
        const { productId, count } = stock;
        const connectionObj = await setUpConnection();

        await query(connectionObj.get(), INSERT, [productId, count]);

        connectionObj.release();

        return true;
    },

    bulkCreate: async (stocks: Stock[]): Promise<boolean> => {
        const stocksToInsert = stocks.reduce((acc, currVal) => {
            const { productId, count } = currVal;
            return [...acc, [productId, count]];
        }, []);

        const connectionObj = await setUpConnection();

        await query(connectionObj.get(), BULK_INSERT, stocksToInsert);

        connectionObj.release();

        return true;
    }
};
