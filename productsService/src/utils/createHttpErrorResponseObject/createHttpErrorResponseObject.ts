export const createHttpErrorResponseObject = (message: string, uuid: string, ...otherProps: unknown[]) => ({
    uuid,
    message,
    ...otherProps
});
