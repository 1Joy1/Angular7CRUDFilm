import {EventEmitter, Injectable} from '@angular/core';
import {Film} from './film';

@Injectable({
    providedIn: 'root'
})
export class ShareService {
    addNewFilm: EventEmitter<Film> = new EventEmitter<Film>();
    onUpdate: EventEmitter<Film> = new EventEmitter<Film>();

    openEditForm: EventEmitter<Film> = new EventEmitter<Film>();
    openCreateForm: EventEmitter<any> = new EventEmitter();

    onCloseModal: EventEmitter<any> = new EventEmitter();

    constructor() {
    }


    public editingFilm(film: Film) {
        this.openEditForm.emit(film);
    }

    public updateFilm(film: Film) {
        this.onUpdate.emit(film);
    }

    public createFilm(film: Film) {
        this.addNewFilm.emit(film);
    }

    public closeModal() {
        this.onCloseModal.emit();
    }

    public createNewFilm() {
        this.openCreateForm.emit();
    }
}


