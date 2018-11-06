import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilmsTableComponent} from './films-table.component';

describe('FilmsTableComponent', () => {
    let component: FilmsTableComponent;
    let fixture: ComponentFixture<FilmsTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FilmsTableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilmsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
