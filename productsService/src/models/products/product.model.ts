import { Product } from './product.types';
import { db, unmarshall, ScanCommand, GetItemCommand } from '@libs/dynamodb';

export const productsModel = {
    getList: async (): Promise<Product[]> => {
        const response = await db.send(new ScanCommand({
            TableName:  'ProductsTable'
        }));

        return response.Items.map(item => unmarshall(item) as Product);
    },
    getById: async (id: string): Promise<Product | null> => {
        const response = await db.send(new GetItemCommand({
            TableName:  'ProductsTable',
            Key: { id: { S: id } }
        }));

        return response.Item ? unmarshall(response.Item) as Product : null;
    }
};
