import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from 'app/common/util';



@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {


    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        const courseId = this.route.snapshot.params['id'];
    
        this.course$ = createHttpObservable(`/api/courses/${courseId}`)

        this.lessons$ = createHttpObservable(`/api/lesons?courseId=${courseId}$pageSize=100`)
                        .pipe(
                            map(res => ["payload"])
                        )

    }

    ngAfterViewInit() {

        fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(event => event.target.value),
                // timing till typing
                debounceTime(400),
                // no duplicate values, in case we usin shift for capitals
                distinctUntilChanged()

            )
            .subscribe(console.log)

    }




}
