import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  
  public usuario:Usuario;

  constructor(private usuariService:UsuarioService,
              private router:Router){
    this.usuario = usuariService.usuario
  }

  logout(){
    this.usuariService.logout();
  }

  buscarCollegcion(termino:string){
    if(termino.length === 0){
      return
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
  }

}
