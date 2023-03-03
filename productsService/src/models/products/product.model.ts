import { db, unmarshall, marshall, ScanCommand, GetItemCommand, PutItemCommand } from '@libs/dynamodb';
import { Product } from './product.types';

export const productsModel = {
    getList: async (): Promise<Product[]> => {
        const response = await db.send(
            new ScanCommand({
                TableName: 'ProductsTable'
            })
        );

        return response.Items.map((item) => unmarshall(item) as Product);
    },
    getById: async (id: string): Promise<Product | null> => {
        const response = await db.send(
            new GetItemCommand({
                TableName: 'ProductsTable',
                Key: { id: { S: id } }
            })
        );

        return response.Item ? (unmarshall(response.Item) as Product) : null;
    },
    create: async (product: Product): Promise<boolean> => {
        await db.send(
            new PutItemCommand({
                TableName: 'ProductsTable',
                Item: marshall(product)
            })
        );

        return true;
    }
};
