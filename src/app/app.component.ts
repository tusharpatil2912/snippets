import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { Snippet } from './snippet.model';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { AppState, getSnippets } from './redux';
// import { GetSnippetsAction } from './redux/snippet.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  snippets$:any;

  constructor(private service: SharedService //, private store:Store<AppState>
    ){}

  ngOnInit(){
    this.snippets$ = this.service.getSnippets();    
  }

  refreshSnippets(){
    // this.store.select(getSnippets).subscribe(async (data:any)=>{
    //   if(!data.isLoaded) {
    //     this.store.dispatch(new GetSnippetsAction(''));
    //   } else {
    //     this.snippets = data.value;
    //   }
    // })
  }

  addSnippet(){
    let snip: Snippet = {id:'', title:'', code:''};
    this.service.addSnippet(snip).then(data=>{
      console.log(data);
      //this.refreshSnippets();
    })
  }

  deleteSnippet(id: string){
    this.service.deleteSnippet(id).then(data=>{
      console.log(data);
      //this.refreshSnippets();
    })
  }

}
