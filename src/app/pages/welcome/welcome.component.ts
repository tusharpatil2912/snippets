import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { Store } from '@ngrx/store';
import { NzConfigService } from 'ng-zorro-antd/core/config';
// import { AppState, getSnippets } from 'src/app/redux';
// import { GetSnippetsAction } from 'src/app/redux/snippet.action';
import { SharedService } from 'src/app/shared.service';
import { Snippet } from 'src/app/snippet.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  dark = false;
  nzEditorOption: any;

  selectedSnippet:Snippet;
  
  snippetId:any;
  code = ``;
  title = '';

  selectedLang = 'html';
  languages = [
    'typescript',
    'css',
    'html'
  ];

  constructor(private nzConfigService: NzConfigService , // private store:Store<AppState>,
    private router: Router, private service: SharedService,
    private activeRoute: ActivatedRoute) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

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
    if(this.snippetId) {
      this.loadData();
    } 
  }

  changeLanguage(lang: string){
    this.selectedLang = lang;
  }

  loadData(){
    this.service.getSnippetById(this.snippetId).subscribe(data=>{
      this.selectedSnippet = this.service.adaptToSnippetFromDocumentData(data);
      this.code = this.selectedSnippet.code;
      this.title = this.selectedSnippet.title;
    })
  }

  updateSnippet(){
    this.service.updateSnippet(this.snippetId,{title: this.title, code: this.code}).then(data=>{
      console.log("updated");
    }).catch((err)=>{
      console.log(err);
    });
  }

  addSnippet(){
    this.service.addSnippet({title: this.title, code:this.code}).then(data=>{
      console.log(data.id);
      this.router.navigate(['snippet',data.id])
    }).catch(err=>{
      console.log(err);
    });
  }

  deleteSnippet(){
    this.service.deleteSnippet(this.snippetId).then(data=>{
      console.log("deleted");
      this.router.navigate(['']);
    }).catch((err)=>{
      console.log(err);
    });
  }

}
