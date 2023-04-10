import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiderbarService {

  menu: any[] = [
    { titulo:'dashboart!',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo:'main', url:'/dashboard' },
        {titulo:'ProgressBar', url:'progress' },
        {titulo:'Graficas', url:'grafica1' }
      ]
    }
  ]

  constructor() { }
}
