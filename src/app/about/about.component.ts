import { ConstantPool } from "@angular/compiler";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { createHttpObservable } from "app/common/util";
import { concat, fromEvent, interval, merge, noop, Observable, of, timer } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    
    // const interval1$ = interval(1000)
    // const sub = interval1$.subscribe(console.log)
    // setTimeout(() => sub.unsubscribe(), 5000)
    
    const http$ = createHttpObservable('/api/courses')
    const sub = http$.subscribe(console.log)
    // cancel http request
    setTimeout(() => sub.unsubscribe(), 0)
  }
}
