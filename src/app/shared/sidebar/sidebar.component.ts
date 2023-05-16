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

  menuItem:any[];
  constructor(private sidebarService:SiderbarService,
              private usuarioService:UsuarioService){

    this.menuItem = sidebarService.menu;
    this.usuario = usuarioService.usuario;
  }


}
