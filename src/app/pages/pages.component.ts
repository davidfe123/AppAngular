import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SiderbarService } from '../services/siderbar.service';

declare function customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent  {
  
  constructor(private settingsService:SettingsService,
              private sidebarService:SiderbarService){
    this.settingsService;
  }
  ngOnInit():void{
    customInitFunction();
    this.sidebarService.cargarMenu();
  }
}


