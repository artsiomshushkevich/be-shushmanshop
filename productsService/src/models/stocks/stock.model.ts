import { db, GetItemCommand, ScanCommand, unmarshall } from '@libs/dynamodb';
import type { Stock } from './stock.types'

export const stocksModel = {
    getList: async (): Promise<Stock[]> => {
        const response = await db.send(new ScanCommand({
            TableName:  'StocksTable'
        }));

        return response.Items.map(item => unmarshall(item) as Stock);
    },
    getProductId: async (id: string): Promise<Stock | null> => {
        const response = await db.send(new GetItemCommand({
            TableName:  'StocksTable',
            Key: { productId: { S: id } }
        }));

        return response.Item ? unmarshall(response.Item) as Stock : null;
    }
};
