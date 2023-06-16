import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay, tap } from 'rxjs';
import { Hospital } from 'src/app/models/hospitales.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit,OnDestroy {

  public totalHospitales:number = this.hospitalesServise.totalReg;
  public desde:number = 0;
  public hospitales:Hospital[]=[];
  public hospitalesTem:Hospital[]=[];
  public cargando:boolean = true;
  public imgSubs:Subscription;

  constructor( private hospitalesServise:HospitalesService,
              private modalImagen:ModalImagenService,
              private busquedasService:BusquedasService){
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagen.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarHospitales());
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

  guardarCambios(hospital:Hospital){
    this.hospitalesServise.editarHospital(hospital._id, hospital.nombre)
          .subscribe(resp =>{
            Swal.fire('Actualizado',hospital.nombre, 'success');
            
          });
  }

  eliminarHospital(hospital:Hospital){
    this.hospitalesServise.eliminarHospital(hospital._id)
        .subscribe(resp =>{
          Swal.fire('Hospital eliminado',hospital.nombre,'success')
          this.cargarHospitales();
        })
  }

  async abrirSweerAlert(){
    const {value = ''} = await Swal.fire<string>({
      title:'crear Hospital',
      text:'ingrese el nombre del nuevo hospital',
      input:'text',
      inputPlaceholder:'ingresa nombre',
      showCancelButton:true
    })

    if(value.trim().length > 0){
      this.hospitalesServise.crearHospital(value)
          .subscribe(resp =>{
            Swal.fire('hospital creado',value,'success')
          })
    }    
  }

  abrirModal(hospital:Hospital){
    this.modalImagen.abrirModal('hospitales',hospital._id,hospital.img)
  }

  buscar(termino:string){
    if(termino.length == 0){
      this.cargarHospitales();
    }
    this.busquedasService.buscar('hospitales',termino)
          .subscribe(resp=>{
            this.hospitales = resp
          })
    return true
  }



}
