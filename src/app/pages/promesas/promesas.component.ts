import { Component, OnInit } from '@angular/core';
import { resolve } from 'chart.js/dist/helpers/helpers.options';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  ngOnInit():void{

  //   const promesa = new Promise((resolve,reject)=>{
  //     if(false){
  //       resolve('hola mundo')
  //     }else{
  //       reject('algo salio mal');
  //     }
  //   });

  //   promesa.then( (mensaje)=>{
  //     console.log(mensaje)
  //   }).catch( error => console.log('Error en mi promesa'))

  //   console.log('Fin init')

    this.getUsuarios();

    this.getUsuarios().then(usuarios =>{ console.log(usuarios)}) ;
  }

  getUsuarios(){
    const promesa = new Promise((resolve,reject) =>{
      fetch('https://reqres.in/api/users?page=2')
      .then(resp => resp.json())
      .then(body => resolve(body.data))
    });

    return promesa;
  }



  

}
