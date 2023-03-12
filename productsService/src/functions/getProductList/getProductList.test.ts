import { getProductList } from './getProductList';
import event from './mock.json';

describe('getProductList', () => {
    test('Should return correct response', async () => {
        // @ts-ignore
        const response = await getProductList(event);

        expect(response).toMatchSnapshot();
    });
});
