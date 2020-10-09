import { ConstantPool } from "@angular/compiler";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { concat, fromEvent, interval, noop, Observable, of, timer } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  // if one of the sources does not compleate, the other source will never start
    const source1$ = interval(1000)
    const source2$ = of(4,5,6)
    const source3$ = of(7,8,9)
    const results$ = concat(source1$, source2$, source3$)
    
    results$.subscribe(console.log)
  }
}
