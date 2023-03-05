import mysql from 'mysql';

export const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: 'shop'
});

const getConnectionFromPool = () =>
    new Promise((onResolve, onError) => {
        db.getConnection((err, connection) => {
            if (err) {
                onError(err);
                return;
            }

            onResolve(connection);
        });
    });

export const setUpConnection = async () => {
    const connection = await getConnectionFromPool();

    return {
        get: () => connection,
        release: () => {
            // @ts-ignore
            connection.release();
        }
    };
};

export const query = (connection: any, query: string, params: unknown[] = []) =>
    new Promise((onResolve, onError) => {
        connection.query(query, params, (err, results) => {
            if (err) {
                onError(err);
                return;
            }

            onResolve(results);
        });
    });
