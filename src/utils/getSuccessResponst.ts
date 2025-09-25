import { IResponse } from "../interfaces/success-responst";

export const getSuccessRes = (
    data: object,
    statusCode: number = 200,
): IResponse => {
    return {
        statusCode,
        message: 'success',
        data,
    };
};