import { Injectable } from '@angular/core';

import { Film } from './film';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()

export class FilmService {
    private apiUrl = 'api/films';
    private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) {

    }

    private static handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('Произошла ошибка:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend вернул код: ${error.status}, ` +
                `Тело ответа содержит: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Что-то пошло не так! Пожалуйста, попробуйте позже.');
    }


    public readFilms(): Observable<Film[]> {
        return this.http.get<Film[]>(this.apiUrl)
            .pipe(catchError(FilmService.handleError));
    }


    createFilm(film: Film): Observable<Film> {
        const httpOptions = { headers: this.headers };

        return this.http.post<Film>(this.apiUrl, film, httpOptions)
            .pipe(catchError(FilmService.handleError));
    }


    updateFilm(film: Film): Observable<any> {
        const httpOptions: {} = { heaers: this.headers,  observe: 'response'};
        const url = `${this.apiUrl}/${film.id}`;

        return this.http.put(url, film, httpOptions)
            .pipe( map( (response: HttpResponse<{}>) => response.status === 204 ),
                catchError(FilmService.handleError));
    }

    deleteFilm(film: Film): Observable<any> {
        const httpOptions: object = { headers: this.headers, observe: 'response' };
        const url = `${this.apiUrl}/${film.id}`;

        return this.http.delete(url, httpOptions)
            .pipe( map( (response: HttpResponse<{}>) => response.status === 204 ),
                catchError(FilmService.handleError));
    }
}
