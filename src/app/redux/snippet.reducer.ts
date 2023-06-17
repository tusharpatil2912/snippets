
import { Action } from './action';
import { Snippet } from '../snippet.model';
import ActionWithPayload, { AllActions, SnippetActionType } from './snippet.action';
import { StoreModel } from './store.model';

export interface State {
    Snippets: StoreModel<Snippet[]>;
}

export const initialState: State = {
    Snippets: {isLoaded: false, value: []}
};


export function reducer(
  state: State = initialState,
  action: Action
) {
  switch (action.type) {
    case SnippetActionType.GET_SNIPPETS_FINISHED:
        return {
            ...state, 
            Snippets: { isLoaded: true, value: action.payload}
        };
    // case SnippetActionType.ADD_SNIPPET:
    //   return ({
    //     ...state,
    //     Snippets: state.Snippets.concat((action as ActionWithPayload<Snippet[]>).payload),
    //     Loaded: false, Loading: true
    //   });
    default:
      return state;
  }
}

export const getSnippets = (
    state: State
): StoreModel<Snippet[]> => state.Snippets;