import {Component, OnInit, TemplateRef} from '@angular/core';
import {Film} from '../shared/film';
import {FilmHttpService} from '../shared/film-http.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ShareService} from '../shared/share.service';


@Component({
    selector: 'app-films-table',
    templateUrl: './films-table.component.html',
    styleUrls: ['./films-table.component.css']
})
export class FilmsTableComponent implements OnInit {

    films: Film[];
    modalRef: BsModalRef;
    modalContent: Film;


    constructor(private filmHttpService: FilmHttpService,
                private modalService: BsModalService,
                private shareService: ShareService) {

        this.shareService.addNewFilm.subscribe(film => this.addNewFilm(film));
    }


    ngOnInit() {
        this.filmHttpService.readFilms().subscribe((data: Film[]) => this.films = data);
    }


    addNewFilm(film: Film) {
        this.filmHttpService.createFilm(film).subscribe((newFilm: Film) => {
            this.films.push(newFilm);
            this.shareService.closeModal();
        });
    }


    onDelete(film: Film) {
        this.filmHttpService.deleteFilm(film).subscribe((status: boolean) => {
            const index = this.films.indexOf(film);
            if (index > -1 && status) {
                this.films.splice(index, 1);
            }
        });
    }


    onEdit(film: Film) {
        this.shareService.editingFilm(film);
        this.shareService.onUpdate.subscribe((editedFilm: Film) => {
            this.onUpdate(film, editedFilm);
        });
    }


    onUpdate(film: Film, editedFilm) {
        this.filmHttpService.updateFilm(editedFilm).subscribe((status: boolean) => {
            const index = this.films.indexOf(film);
            if (index > -1 && status) {
                this.films[index] = editedFilm;
                this.shareService.closeModal();
            }
        });
    }


    openModal(modalTemplate: TemplateRef<any>, film: Film) {
        this.modalContent = film;
        this.modalRef = this.modalService.show(modalTemplate, {class: 'modal-lg'});
    }

}
