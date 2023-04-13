import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, take ,map,filter, Subscription} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor(){
    // let i =-1; 
    // const obs$ = new Observable( observer =>{
    //   const intervale = setInterval(()=>{

    //     i++;
    //     observer.next(i);

    //     if(i === 4 ){
    //       clearInterval(intervale);
    //       observer.complete();
    //     }

    //   },1000);
    // });

    // obs$.subscribe(
    //   valor => console.log(valor)
    // );
    this.intervalSubs = this.retornaObservable().subscribe( sub => console.log(sub))
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaObservable(){
    return interval(500)
            .pipe(
            map(valor => valor +1),
            filter( valor =>(valor % 2 === 0)?true:false ),
            //take(10)
            );
  }
}
function intervale(): any {
  throw new Error('Function not implemented.');
}

