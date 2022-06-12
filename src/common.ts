import * as vscode from 'vscode';

export var outputPanel = vscode.window.createOutputChannel("vscodedemo");

export const extensionPath = vscode.extensions.getExtension("naso.vscodedemo").extensionPath;