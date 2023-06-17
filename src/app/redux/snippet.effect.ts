import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SharedService } from "../shared.service";
import { GetSnippetsFinishedAction, SnippetActionType } from "./snippet.action";
import { from, map, switchMap } from "rxjs";


@Injectable()
export class SnippetEffect {

    constructor(private actions$: Actions, private sharedService: SharedService){
    }

    snippetsGet$ = createEffect(()=>
        this.actions$.pipe(
            ofType(SnippetActionType.GET_SNIPPETS),
            switchMap((action: any)=> {
                return from(this.sharedService.getSnippets()).pipe(map((response)=>{
                    return new GetSnippetsFinishedAction(this.sharedService.adaptToSnippetsFromDocumentData(response))
                }));
            })
        )
    )

}