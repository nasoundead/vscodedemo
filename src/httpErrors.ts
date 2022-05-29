export enum HTTPErrorType {
    ResponeError = 0,
    NetworkError = 1,
}

export class HTTPError implements Error {
    private _type: HTTPErrorType;
    private _code: number;
    private _err: Error;
    constructor(err: Error, type?: HTTPErrorType, code?: number) {
        this._err = err;
        this._type = type;
        this._code = code;
    }
    get name() {
        return this._err.name;
    }
    get message() {
        return this._err.message;
    }
    get stack() {
        return this._err.stack;
    }
    get originalError(): Error {
        return this._err;
    }
    get isResponeError(): boolean {
        return this._type === HTTPErrorType.ResponeError;
    }
    get isNetworkError(): boolean {
        return this._type === HTTPErrorType.NetworkError;
    }
    isHTTPCode(code: number): boolean {
        return code === this._code;
    }
}