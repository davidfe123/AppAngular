import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private elementoColor = document.querySelector('#theme');
  

  constructor(){
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css'
    this.elementoColor.setAttribute('href',url);
  }

  changeTheme(theme:string){
    const url = `./assets/css/colors/${ theme }.css`;

    this.elementoColor.setAttribute('href',url);
    localStorage.setItem('theme', url );
    
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const a_li = document.querySelectorAll('.selector');
    a_li.forEach(elem =>{
    elem.classList.remove('working');
    const btnTheme = elem.getAttribute('data-theme');
    const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
    const currentTheme = this.elementoColor.getAttribute('href'); 

    if(btnThemeUrl === currentTheme){
      elem.classList.add('working');
    }
  })
}

  
}
