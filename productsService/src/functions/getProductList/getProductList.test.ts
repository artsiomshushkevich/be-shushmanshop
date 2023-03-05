import { getProductList } from './getProductList';
import event from './mock.json';

describe('getProductList', () => {
    // TODO: stab DB utils later
    test.skip('Should return correct response', async () => {
        // @ts-ignore
        const response = await getProductList(event);

        expect(response).toMatchSnapshot();
    });
});
