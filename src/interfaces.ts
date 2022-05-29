import * as vscode from 'vscode';
import * as child_process from 'child_process';


export interface MyError {
    /**
     * error messages from stderr
     */
    error: string;
    /**
     * Image of error description
     */
    out: Buffer;
}