import {Injectable} from '@angular/core';

import {Film} from './film';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http/src/response';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


@Injectable()

export class FilmHttpService {
    private apiUrl = 'api/films';
    private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) {

    }

    private static handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('Произошла ошибка:', error.error.message);
        } else {
            console.error(
                `Backend вернул код: ${error.status}, ` +
                `Тело ответа содержит: ${error.error}`);
        }
        return throwError(
            'Что-то пошло не так! Пожалуйста, попробуйте позже.');
    }


    public readFilms(): Observable<Film[]> {
        return this.http.get<Film[]>(this.apiUrl)
            .pipe(catchError(FilmHttpService.handleError));
    }


    public createFilm(film: Film): Observable<Film> {
        const httpOptions: object = {headers: this.headers};

        return this.http.post<Film>(this.apiUrl, film, httpOptions)
            .pipe(catchError(FilmHttpService.handleError));
    }


    public updateFilm(film: Film): Observable<any> {
        const httpOptions: object = {heaers: this.headers, observe: 'response'};
        const url = `${this.apiUrl}/${film.id}`;

        return this.http.put(url, film, httpOptions)
            .pipe(map((response: HttpResponse<{}>) => response.status === 204),
                catchError(FilmHttpService.handleError));
    }

    public deleteFilm(film: Film): Observable<any> {
        const httpOptions: object = {headers: this.headers, observe: 'response'};
        const url = `${this.apiUrl}/${film.id}`;

        return this.http.delete(url, httpOptions)
            .pipe(map((response: HttpResponse<{}>) => response.status === 204),
                catchError(FilmHttpService.handleError));
    }

    public uploadPoster(img): Observable<any> {
        const httpOptions: object = {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'}), observe: 'response'};
        const url = 'upload/image/';
        return this.http.post<Film>(url, img, httpOptions)
            .pipe(catchError(FilmHttpService.handleError));
    }
}
