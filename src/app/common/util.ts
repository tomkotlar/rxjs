import { Observable } from "rxjs";

export function createHttpObservable(url:string) {
    return new Observable(observer => {

      const controller = new AbortController()
      const signal = controller.signal

       fetch(url, {signal})
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
       return () => controller.abort()
     })
   }