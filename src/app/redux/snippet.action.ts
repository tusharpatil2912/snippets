import { Action } from './action';
import { Snippet } from '../snippet.model';

export enum SnippetActionType {
    GET_SNIPPETS = '[SNIPPET] Get Snippets',
    GET_SNIPPETS_FINISHED = '[SNIPPET] Get Snippets Finished',
    ADD_SNIPPET = '[SNIPPET] Add Snippet',
}

export class GetSnippetsAction implements Action {
    readonly type = SnippetActionType.GET_SNIPPETS;
    constructor(public payload: string) { }
}

export class GetSnippetsFinishedAction implements Action {
    readonly type = SnippetActionType.GET_SNIPPETS_FINISHED;
    constructor(public payload: Snippet[]) { }
}




export class AddSnippetAction implements Action {
    readonly type = SnippetActionType.ADD_SNIPPET;
    payload: Snippet;
    constructor(payload: Snippet) {
        this.payload = payload;
    }
}

export type AllActions = AddSnippetAction | GetSnippetsAction;


export default interface ActionWithPayload<T> extends Action {
    payload: T;
}