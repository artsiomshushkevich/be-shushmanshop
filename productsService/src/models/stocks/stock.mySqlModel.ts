import { setUpConnection, query } from '@libs/mysql';
import { Stock } from './stock.types';

const INSERT = `
    INSERT INTO stocks (productId, count)
    VALUES
        (?, ?);
`;

export const stocksMySqlModel = {
    create: async (stock: Stock): Promise<boolean> => {
        const { productId, count } = stock;
        const connectionObj = await setUpConnection();

        await query(connectionObj.get(), INSERT, [productId, count]);

        connectionObj.release();

        return true;
    }
};
