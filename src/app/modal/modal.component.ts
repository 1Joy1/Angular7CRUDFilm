import {Component, OnInit, ViewChild} from '@angular/core';
import {ShareService} from '../shared/share.service';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


    constructor(private shareService: ShareService) {
        this.shareService.onCloseModal.subscribe(() => this.closeModal());
        this.shareService.openEditForm.subscribe(() => this.showModal());
        this.shareService.openCreateForm.subscribe(() => this.showModal());
    }

    @ViewChild(ModalDirective) modal: ModalDirective;

    ngOnInit() {
    }

    public showModal() {
        this.modal.show();
    }

    public closeModal() {
        this.modal.hide();
    }
}


