import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { AppState, getSnippets } from 'src/app/redux';
import { GetSnippetsAction } from 'src/app/redux/snippet.action';
import { Snippet } from 'src/app/snippet.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  dark = false;
  snippetId:any;

  nzEditorOption: any;

  code = `Import { Life } from everything`;

  selectedLang = 'html';
  languages = [
    'typescript',
    'css',
    'html'
  ];

  constructor(private nzConfigService: NzConfigService, private store:Store<AppState>,
    private router: Router,
    private activeRoute: ActivatedRoute) {}

  onDarkModeChange(dark: boolean): void {
    this.dark = dark;
    const defaultEditorOption = this.nzConfigService.getConfigForComponent('codeEditor')?.defaultEditorOption || {};
    this.nzConfigService.set('codeEditor', {
      defaultEditorOption: {
        ...defaultEditorOption,
        theme: dark ? 'vs-dark' : 'vs'
      }
    });
  }

  ngOnInit() {
    this.snippetId=this.activeRoute.snapshot.params['id'];
    this.nzEditorOption = {
      language: this.selectedLang
    };
    this.loadData();
  }

  changeLanguage(lang: string){
    this.selectedLang = lang;
  }

  loadData(){
    this.store.select(getSnippets).subscribe(async (data:any)=>{
      if(!data.isLoaded) {
        this.store.dispatch(new GetSnippetsAction(''));
      } else {
        let snippets = data.value;
        const snip = snippets.find((s: Snippet)=> s.id === this.snippetId);
        this.code = snip.code;
      }
    })
  }


}
