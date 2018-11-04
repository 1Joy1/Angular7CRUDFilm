import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/data.service';

import { AppComponent } from './app.component';
import { FilmFormComponent } from './films/film-form/film-form.component';
import { FilmsTableComponent } from './films/films-table/films-table.component';
import { FilmService } from './shared/film.service';

@NgModule({
    declarations: [
        AppComponent,
        FilmFormComponent,
        FilmsTableComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        PopoverModule.forRoot(),
        ModalModule.forRoot(),
        HttpClientModule,

        // Remove this, for real request to api server
        InMemoryWebApiModule.forRoot(InMemoryDataService),
    ],
    providers: [FilmService],
    bootstrap: [AppComponent],
})
export class AppModule { }
