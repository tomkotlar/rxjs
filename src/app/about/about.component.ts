import { ConstantPool } from "@angular/compiler";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fromEvent, interval, noop, Observable, timer } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  
  }
}
