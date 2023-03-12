import { getProductById } from './getProductById';
import event from './mock.json';
import errorEvent from './errorMock.json';

jest.mock('uuid', () => ({ v4: () => '916eb106-2ecc-4ac9-af2c-044f75220c5b' }));

describe('getProductById', () => {
    // TODO: stab DB utils later
    test.skip('Should return correct response', async () => {
        // @ts-ignore
        const response = await getProductById(event);

        expect(response).toMatchSnapshot();
    });

    test.skip('Should return 404 error response', async () => {
        // @ts-ignore
        const response = await getProductById(errorEvent);

        expect(response).toMatchSnapshot();
    });
});
