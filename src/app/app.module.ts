import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {ModalModule} from 'ngx-bootstrap/modal';

import {HttpClientModule} from '@angular/common/http';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';

import {InMemoryDataService} from './shared/data.service';
import {ShareService} from './shared/share.service';
import {FilmHttpService} from './shared/film-http.service';

import {AppComponent} from './app.component';
import {FilmFormComponent} from './film-form/film-form.component';
import {FilmsTableComponent} from './films-table/films-table.component';
import {FilmAddComponent} from './film-add/film-add.component';

import {ModalComponent} from './modal/modal.component';


@NgModule({
    declarations: [
        AppComponent,
        FilmFormComponent,
        FilmsTableComponent,
        ModalComponent,
        FilmAddComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ModalModule.forRoot(),
        HttpClientModule,
        ReactiveFormsModule,

        // Remove this, for real request to api server
        InMemoryWebApiModule.forRoot(InMemoryDataService, {post204: false, delete404: true}),
    ],
    providers: [FilmHttpService, ShareService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
