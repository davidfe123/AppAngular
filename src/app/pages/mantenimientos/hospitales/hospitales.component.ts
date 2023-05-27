import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Hospital } from 'src/app/models/hospitales.model';
import { HospitalesService } from 'src/app/services/hospitales.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  public totalHospitales:number = this.hospitalesServise.totalReg;
  public desde:number = 0;
  public hospitales:Hospital[]=[];
  public cargando:boolean = true;

  constructor( private hospitalesServise:HospitalesService){
  }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.cargando = true
    this.hospitalesServise.cargarHopitales(this.desde)
          .subscribe( hospitales =>{
            this.cargando = false
            this.hospitales = hospitales
          })
          
  }

  paginacion(num:number){

    this.desde+=num;
    if(this.desde < 0){
      this.desde = 0
    }else if(this.desde > this.totalHospitales){
      this.desde -=num
    }
    this.cargarHospitales();
    
  }



}
