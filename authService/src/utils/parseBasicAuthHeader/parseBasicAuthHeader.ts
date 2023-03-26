export const parseBasicAuthHeader = (value: string): null | { username: string; password } => {
    const [type, token] = value.split(' ');

    if (type !== 'Basic' || !token) {
        return null;
    }

    const buff = Buffer.from(token || '', 'base64');
    const parsedToken = buff.toString('utf-8');

    const [username, password] = parsedToken.split(':');

    if (!username || !password) {
        return null;
    }

    return {
        username,
        password
    };
};
