import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SiderbarService } from 'src/app/services/siderbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`.has-arrow.waves-effect.waves-dark.active {
    background-color: transparent;
    }`
    ]
})
export class SidebarComponent {

  public usuario:Usuario;


  constructor(public sidebarService:SiderbarService,
              private usuarioService:UsuarioService){
    this.usuario = usuarioService.usuario;
  }


}
