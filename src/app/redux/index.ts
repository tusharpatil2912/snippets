import { ActionReducerMap, createSelector} from "@ngrx/store";
import * as fromSnippetData from "./snippet.reducer";

export interface AppState {
    snippetsData: fromSnippetData.State;
}

export const reducers: ActionReducerMap<AppState> = {
    snippetsData: fromSnippetData.reducer
}

const getSnippetsState = (state: AppState) => state.snippetsData || {};

export const getSnippets = createSelector(
    getSnippetsState,
    fromSnippetData.getSnippets
);