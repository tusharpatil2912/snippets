import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { Store } from '@ngrx/store';
import { NzConfigService } from 'ng-zorro-antd/core/config';
// import { AppState, getSnippets } from 'src/app/redux';
// import { GetSnippetsAction } from 'src/app/redux/snippet.action';
import { SharedService } from 'src/app/shared.service';
import { Snippet } from 'src/app/snippet.model';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private router: Router, private service: SharedService, private message: NzMessageService,
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
    const id = this.message.loading('Updating the Snippet..', { nzDuration: 0 }).messageId;
    this.service.updateSnippet(this.snippetId,{title: this.title, code: this.code}).then(data=>{
      //console.log("updated");
      this.message.remove(id);
      this.message.create('success', `Snippet Updated Successfully!`);
    }).catch((err)=>{
      console.log(err);
      this.message.remove(id);
      this.message.create('error', `Something went wrong while updating the Snippet!`);
    });
  }

  addSnippet(){
    const id = this.message.loading('Adding the Snippet..', { nzDuration: 0 }).messageId;
    this.service.addSnippet({title: this.title, code:this.code}).then(data=>{
      //console.log(data.id);
      this.message.remove(id);
      this.message.create('success', `Snippet Added Successfully!`);
      this.router.navigate(['snippet',data.id])
    }).catch(err=>{
      console.log(err);
      this.message.remove(id);
      this.message.create('error', `Something went wrong while adding the Snippet!`);
    });
  }

  deleteSnippet(){
    const id = this.message.loading('Deleting the Snippet..', { nzDuration: 0 }).messageId;
    this.service.deleteSnippet(this.snippetId).then(data=>{
      //console.log("deleted");
      this.message.remove(id);
      this.message.create('success', `Snippet Deleted Successfully!`);
      this.router.navigate(['']);
    }).catch((err)=>{
      console.log(err);
      this.message.remove(id);
      this.message.create('error', `Something went wrong while deleting the Snippet!`);
    });
  }

}
