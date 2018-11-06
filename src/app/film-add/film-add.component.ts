import {Component, OnInit} from '@angular/core';
import {ShareService} from '../shared/share.service';

@Component({
    selector: 'app-film-add',
    templateUrl: './film-add.component.html',
    styleUrls: ['./film-add.component.css']
})
export class FilmAddComponent implements OnInit {

    constructor(private shareService: ShareService) {
    }

    ngOnInit() {
    }

    createNewFilm() {
        this.shareService.createNewFilm();
    }
}
