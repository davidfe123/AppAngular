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
        {titulo:'Graficas', url:'grafica1' },
        {titulo:'Promesas', url:'promesas' },
        {titulo:'Rxjs', url:'rxjs' }
      ]
    },

    { titulo:'Mantenimiento',
      icono:'mdi mdi-folder-lock-open',
      submenu:[
        {titulo:'Usuarios', url:'usuarios' },
        {titulo:'Hospitales', url:'hospitales'},
        {titulo:'Medicos', url:'medicos'},
        {titulo:'Medico', url:'medico/:id'}
      ]
    }
  ]

  constructor() { }
}
