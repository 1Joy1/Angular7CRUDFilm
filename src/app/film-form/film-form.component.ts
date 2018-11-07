import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import {Film} from '../shared/film';
import {FilmHttpService} from '../shared/film-http.service';
import {ShareService} from '../shared/share.service';

@Component({
    selector: 'app-film-form',
    templateUrl: './film-form.component.html',
    styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit {

    filmForm: FormGroup;
    posterForm: FormGroup;
    imagePreviewSrc: string;
    selectedFile = null;
    editingFilm = false;
    posterNotUploaded = false;

    patternIpValidation = new RegExp('^' +
        '(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{2}|[0-9])' +
        '(\\.(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{2}|[0-9])){3}' +
        '(\\/[1-9]|\\/[1-2][0-9]|\\/3[0-2])?$');


    constructor(private formBuilder: FormBuilder,
                private changeDetector: ChangeDetectorRef,
                private filmHttpService: FilmHttpService,
                private shareService: ShareService) {

        this.shareService.openCreateForm.subscribe(() => {
            this.ngOnInit();
            this.editingFilm = false;
        });

        this.shareService.openEditForm.subscribe((film: Film) => {
            this.initFilmForm(film);
            this.initPosterForm();
            this.imagePreviewSrc = film.posterUrl;
            this.editingFilm = true;
        });
    }

    ngOnInit() {
        this.initFilmForm();
        this.initPosterForm();
        this.imagePreviewSrc = '';
    }

    initPosterForm(): void {
        this.posterForm = this.formBuilder.group({
            posterFile: [null, Validators.required],
        });
    }

    initFilmForm(film?): void {
        this.filmForm = this.formBuilder.group({
            id: [film ? film.id : ''],
            filmName: [film ? film.filmName : '', [Validators.required]],
            genre: [film ? film.genre : '', [Validators.required]],
            duration: [film ? film.duration : '', [Validators.required, Validators.pattern(/^[0-9][0-9](:[0-5][0-9])$/)]],
            dateRelease: [film ? film.dateRelease : '', [Validators.required, Validators.pattern(/^[1-2][0-9]{3}$/)]],
            ageLimit: [film ? film.ageLimit : '', [Validators.pattern(/^[0-9]{1,2}$/)]],
            subtitle: [film ? film.subtitle : ''],
            description: [film ? film.description : '', [Validators.required]],
            posterUrl: [film ? film.posterUrl : '', [Validators.required]],
            permittedIp: this.formBuilder.array([['', [Validators.required, Validators.pattern(this.patternIpValidation)]]]),
        });

        if (film && film.permittedIp.length) {
            film.permittedIp.forEach(value => this.addPermittedIpControll(value));
            this.removePermittedIpControll(0);
        }

        this.posterNotUploaded = false;
    }

    onFileChange(event) {
        const reader = new FileReader();

        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.posterForm.patchValue({
                    file: reader.result
                });
                this.imagePreviewSrc = reader.result;
            };
            this.selectedFile = event.target.files[0];
        }
        this.posterNotUploaded = true;
    }

    getValidPosterStatus() {
        return this.filmForm.controls['posterUrl'].invalid && this.filmForm.controls['posterUrl'].touched;
    }

    onSubmit() {
        if (this.filmForm.invalid) {
            this.markFormGroupTouched(this.filmForm);
            this.markFormGroupTouched(this.posterForm);
            return;
        }

        this.editingFilm ? this.shareService.updateFilm(this.filmForm.value) : this.shareService.createFilm(this.filmForm.value);
    }

    onUploadPoster() {
        this.filmHttpService.uploadPoster(this.selectedFile).subscribe(res => console.log(res));

        /** TODO: Временная заглушка так, как нет реализации бека*/
        (<FormControl>this.filmForm.controls['posterUrl'])
            .setValue('../../../assets/img/film512.png', {onlySelf: true});

        this.filmForm.controls['posterUrl'].updateValueAndValidity();

        this.posterNotUploaded = false;
    }

    addPermittedIpControll(ip?): void {
        (<FormArray>this.filmForm.controls['permittedIp']).push(new FormControl(ip ? ip : '', [
            Validators.required,
            Validators.pattern(this.patternIpValidation)
        ]));
    }

    removePermittedIpControll(indexFild: number): void {
        const ipFields: FormArray = <FormArray>this.filmForm.get('permittedIp');

        if (ipFields.length > 1) {
            ipFields.removeAt(indexFild);

        }
    }

    markFormGroupTouched(Form: FormGroup) {
        (<any>Object).values(Form.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }
}
