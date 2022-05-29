import { outputPanel } from "./common";
import { HTTPError } from "./httpErrors";
import { MyError } from "./interfaces";


export function parseError(error: any): MyError[] {
    let nb = Buffer.alloc(0);
    if (typeof (error) === "string") {
        return [<MyError>{ error: error, out: nb }];
    } else if (error instanceof TypeError || error instanceof Error) {
        let err = error as TypeError;
        return [<MyError>{ error: err.stack, out: nb }];
    } else if (error instanceof HTTPError) {
        let err = error.originalError as TypeError;
        return [<MyError>{ error: err.stack, out: nb }];
    } else if (error instanceof Array) {
        let arr = error as any[];
        if (!arr || !arr.length) return [];
        if (instanceOfExportError(arr[0])) return error as MyError[];
    } else {
        return [error as MyError];
    }
    return null;
    function instanceOfExportError(object: any): object is MyError {
        return 'error' in object;
    }
}

export function showMessagePanel(message: any) {
    outputPanel.clear();
    let errs: MyError[];
    if (typeof (message) === "string") {
        outputPanel.appendLine(message);
    } else if (errs = parseError(message)) {
        for (let e of errs) {
            outputPanel.appendLine(e.error);
        }
    } else {
        outputPanel.appendLine(new Object(message).toString());
    }
    outputPanel.show();
}