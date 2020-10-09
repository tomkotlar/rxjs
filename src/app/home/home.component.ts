import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, timer, noop } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
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


    ngOnInit() {

        const http$ = createHttpObservable("/api/course");

        const courses$: Observable<Course[]>  = http$
            .pipe(
                // Tap is used to produce side effects in our observable chain.
                // So whenever we want to update something outside of the observable chain; for example updating
                // a variable at the level of the component or a logging statement.
                tap(() => console.log("HTTP request started")), 
                map(res => Object.values(res["payload"])),
                shareReplay()
                // passing the data from res to each each /new subscription/stream. prenvent multiple http call 
            );


        this.beginnerCourses$ = courses$.pipe(
            map(couses => couses
                .filter(course => course.category == 'BEGINNER'))
        )
        this.advancedCourses$ = courses$.pipe(
            map(couses => couses
                .filter(course => course.category == 'ADVANCED'))
        )

    }

}
