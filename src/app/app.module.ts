import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { SharedService } from './shared.service';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './redux';
import { SnippetEffect } from './redux/snippet.effect';
import { StoreDevtoolsModule} from '@ngrx/store-devtools'

registerLocaleData(en);


const firebaseConfig = {
  apiKey: "AIzaSyBZf4MSYIKlLWpPscuR0wRXHmpmrbwwJ9g",
  authDomain: "snippets-e190a.firebaseapp.com",
  projectId: "snippets-e190a",
  storageBucket: "snippets-e190a.appspot.com",
  messagingSenderId: "273701307915",
  appId: "1:273701307915:web:5e88826e92d1e47400a90e",
  measurementId: "G-GE1GNEBL25"
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzGridModule,
    NzSelectModule,
    NzCodeEditorModule, 
    NzSwitchModule,
    NzIconModule,
    FormsModule, 
    ReactiveFormsModule, 
    StoreModule.forRoot(reducers), EffectsModule.forRoot([SnippetEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 30
    })
  ],
  providers: [SharedService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
