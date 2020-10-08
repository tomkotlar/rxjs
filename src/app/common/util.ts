import { Observable } from "rxjs";

export function createHttpObservable(url:string) {
    return new Observable(observer => {
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
   }