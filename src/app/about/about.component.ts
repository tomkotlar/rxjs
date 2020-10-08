import { ConstantPool } from "@angular/compiler";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fromEvent, interval, noop, Observable, timer } from "rxjs";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // creating own Observable pattern 
   const http$ =  new Observable(observer => {
     fetch('/api/cousrse')
     .then(response => {
       return response.json()
     })
     .then(body => {
      //  observable pattern, after complete its sotp the value stream
       observer.next(body)
       observer.complete()
     })
    //  catching err
     .catch(err => {
       observer.error(err)
     })
   })
   
  //  sunbscribing to value stream
   http$.subscribe(
     course => console.log(course),
    // noop stands for no operation 
    noop,
     () => console.log("compleated")
   )
  
  }
}



  // // Observable blueprint for stream

    // // const interval$ = interval(1000)
    // const interval$ = timer(3000, 1000);

    // const sub = interval$.subscribe((val) => console.log("strea, => 1" + val));
    // // unsubscribing from stream of values.
    // setTimeout(() => sub.unsubscribe(), 5000)

    // const click$ = fromEvent(document, "click");
    // click$.subscribe(
    //   (evt) => console.log(evt),
    //   (err) => console.log(err), 
    //   () => console.log("completed")
    // );