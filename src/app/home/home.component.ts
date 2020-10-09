import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, timer, noop} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from "../common/util";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// blueprint for stream of data
    beginnerCourses$: Observable<Course[]>
    advancedCourses$: Observable<Course[]>

    constructor() {

    }

    ngOnInit() {

        const http$ = createHttpObservable("/api/course");

        const courses$: Observable<Course[]> = http$.pipe(map(res => Object.values(res["payload"])));
   

        this.beginnerCourses$ = courses$.pipe(
            map(couses => couses
                .filter(course => course.category == 'BEGINNER'))
        )
        this.advancedCourses$ = courses$ .pipe(
            map(couses => couses.filter(course => course.category == 'ADVANCED'))
        )



        courses$.subscribe(
          courses => {
           
        }, 
        // noop stands for no operation
        noop,
          () => console.log("compleated")
        );

    }

}
