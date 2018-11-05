import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/data.service';

import { AppComponent } from './app.component';
import { FilmFormComponent } from './films/film-form/film-form.component';
import { FilmsTableComponent } from './films/films-table/films-table.component';
import { FilmHttpService } from './shared/film-http.service';
import { FilmsComponent } from './films/films.component';

@NgModule({
    declarations: [
        AppComponent,
        FilmFormComponent,
        FilmsTableComponent,
        FilmsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        PopoverModule.forRoot(),
        ModalModule.forRoot(),
        HttpClientModule,
        ReactiveFormsModule,

        // Remove this, for real request to api server
        InMemoryWebApiModule.forRoot(InMemoryDataService, {post204: false, delete404: true}),
    ],
    providers: [FilmHttpService],
    bootstrap: [AppComponent],
})
export class AppModule { }
