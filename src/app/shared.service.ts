import { Injectable } from '@angular/core';
import { DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Snippet } from './snippet.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fs: Firestore) { }

  getSnippets(){
    let snippetsCollection = collection(this.fs,'snippets');
    return collectionData(snippetsCollection,{idField:'id'});
  }

  addSnippet(snippet:Snippet){
    let snippetsCollection = collection(this.fs,'snippets');
    return addDoc(snippetsCollection,snippet);
  }

  // updateSnippet(id: string, snippet:Snippet){
  //   let docRef = doc(this.fs,'snippets/'+id);
  //   return updateDoc(docRef,snippet);
  // }

  deleteSnippet(id: string){
    let docRef = doc(this.fs,'snippets/'+id);
    return deleteDoc(docRef)
  }

  public adaptToSnippetsFromDocumentData(data: DocumentData[]): Snippet[] {
    let Snippets: Snippet[] = [];
    data.forEach(d=>{
      Snippets.push({id: d['id'], title: d['title'], code: d['code']});
    });
    return Snippets;
  }
}
