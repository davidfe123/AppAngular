import { Component } from '@angular/core';
import { SiderbarService } from 'src/app/services/siderbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`.has-arrow.waves-effect.waves-dark.active {
    background-color: transparent;
    }`
    ]
})
export class SidebarComponent {

  menuItem:any[];
  constructor(private sidebarService:SiderbarService){
    this.menuItem = sidebarService.menu;
  }

}
