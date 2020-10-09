import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {fromEvent} from 'rxjs';
import {concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;
    course:Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngOnInit() {
        // valueChanges is form Observable which emits cheanges on keyup
        this.form.valueChanges
            .pipe(
                filter(() => this.form.valid ),
                // mergeMap - fetch in parallel the results of each call as they arrive over time 
                // However in the concrete scenario of a save we want really to make sure that the save is completed before
                // performing a second save. So if the order of the observable values is important then we should use concat
                mergeMap(changes => this.saveCourse(changes))
            )
            .subscribe()
    }

    saveCourse(changes) {
       return fromPromise(
            fetch(`/api/courses/${this.course.id}`,{
                method: 'PUT',
                body: JSON.stringify(changes),
                headers: {'content-type': 'aplication/json'}
            }))
    }


    ngAfterViewInit() {


    }



    close() {
        this.dialogRef.close();
    }

}
