export enum HttpStatusCodes {
    NotFound = 404,
    BadRequest = 400,
    ServerError = 500,
    Success = 200,
    Created = 201
}

export type HttpStatusCodesUnion = 404 | 400 | 500 | 200 | 201;
