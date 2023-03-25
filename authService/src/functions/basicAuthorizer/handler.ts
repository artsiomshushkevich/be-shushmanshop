import { v4 as uuidv4 } from 'uuid';

export const basicAuthorizer = async (event) => {
    try {
        console.log('Authorizing request...', event);
    } catch (e) {
        const uuid = uuidv4();
        console.error('Processing CSV file failed! UUID: %s', uuid, e);
    }
};
