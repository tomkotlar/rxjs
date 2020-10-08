import { ConstantPool } from "@angular/compiler";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fromEvent, interval, noop, Observable, timer } from "rxjs";
import { map } from "rxjs/operators";
import { createHttpObservable } from "../common/util";
@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    const http$ = createHttpObservable("/api/course");

    const courses$ = http$.pipe(map((res) => Object.values(res["payload"])));

    courses$.subscribe(
      (course) => console.log(course),
      // noop stands for no operation
      noop,
      () => console.log("compleated")
    );
  }
}
