import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo:string;
  public tituloSubs$ : Subscription;

  constructor(private router:Router){
    this.tituloSubs$ = this.getArgumentosRuta().subscribe( title =>{
      this.titulo = title['titulo'];
    })
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }



  getArgumentosRuta(){
    return  this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((evetnt:ActivationEnd) => evetnt.snapshot.firstChild === null),
      map((evetnt:ActivationEnd) => evetnt.snapshot.data)
    )
  }


}
