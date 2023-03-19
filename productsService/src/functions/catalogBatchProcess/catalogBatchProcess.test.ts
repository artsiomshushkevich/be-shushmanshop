import { main } from './catalogBatchProcess';
import { productsService } from '@services/products';

jest.mock('uuid', () => ({ v4: () => '916eb106-2ecc-4ac9-af2c-044f75220c5b' }));
jest.mock('@libs/sns', () => {
    return {
        snsClient: {
            send: () => Promise.resolve(true)
        }
    };
});

jest.mock('@libs/sqs', () => {
    return {
        sqsClient: {
            send: () => Promise.resolve(true)
        }
    };
});

const records = {
    Records: [
        {
            body: '{"title":"BYD","description":"Excellence","price":3000,"count":20}',
            receiptHandle: 'recipieptHandle0'
        },
        {
            body: '{"title":"Testla","description":"Model S","price":30000,"count":20}',
            receiptHandle: 'recipieptHandle1'
        }
    ]
};

describe('catalogBatchProcess', () => {
    let originEnv = process.env;

    beforeAll(() => {
        process.env = {
            ...originEnv,
            QUEUE_URL: 'https://aws.queue.url.com',
            CREATE_PRODUCT_TOPIC_ARN: 'arn:aws:XXXXX'
        };
    });

    beforeEach(() => {
        console.log = jest.fn().mockImplementation();
        console.error = jest.fn().mockImplementation();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should successfully perform all the operations (getting products from records/creating in DB, deleting from SNS, sending SNS) and send logs', async () => {
        productsService.bulkCreate = jest.fn().mockReturnValue(Promise.resolve(true));
        // @ts-ignore
        await main(records);

        // @ts-ignore
        expect(console.log.mock.calls).toMatchSnapshot();
        // @ts-ignore
        expect(console.error.mock.calls).toMatchSnapshot();
    });

    test("Should make some logs until DB bulk creation won't thrown an error", async () => {
        productsService.bulkCreate = jest.fn().mockReturnValue(Promise.reject(false));
        // @ts-ignore
        await main(records);

        // @ts-ignore
        expect(console.log.mock.calls).toMatchSnapshot();

        // @ts-ignore
        expect(console.error.mock.calls).toMatchSnapshot();
    });
});
