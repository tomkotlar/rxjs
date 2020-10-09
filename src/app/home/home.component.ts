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

    beginnerCourses: Course[]
    advancedCourses: Course[]

    constructor() {

    }

    ngOnInit() {

        const http$ = createHttpObservable("/api/course");

        const courses$ = http$.pipe(map((res) => Object.values(res["payload"])));
   
        courses$.subscribe(
            // imperitive design rxjs antipattern which does not scale up
          courses => {
              this.beginnerCourses = courses.filter(course => course.category == "BEGINNER");
         
              this.advancedCourses = courses.filter(course => course.category == "ADVANCED")
        }, 
        // noop stands for no operation
        noop,
          () => console.log("compleated")
        );

    }

}
