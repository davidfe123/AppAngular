import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/medico.service';
import {Medico} from 'src/app/models/medico.model'
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Subscribable, Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit,OnDestroy {
  public cargando:boolean = true;
  public medicos:Medico[]=[]
  private imgSubs:Subscription;

  constructor(private medicoService:MedicoService,
              private modalImagenService:ModalImagenService,
              private busquedasService:BusquedasService){}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
                  .pipe(delay(100))
                  .subscribe( img => this.cargarMedicos())
    
  }

  borrarMedico(medico:Medico){

    Swal.fire({
      title:'borrar medico',
      text:`Esta a punto de borrar a ${medico.nombre}`,
      icon:'question',
      showCancelButton:true,
      confirmButtonText:'si,borrarlo'
    }).then((result) => {
      if(result.value){
        this.medicoService.borrarMedico(medico._id)
              .subscribe( resp=>{
                  this.cargarMedicos();
                  Swal.fire('medico eliminado',`medico ${medico.nombre} fue eliminado `,'success')
              })
      }
    })

    
        
  }

  cargarMedicos(){
    this.cargando=true;
    this.medicoService.obtenerMedicos()
          .subscribe(medicos=>{ 
            this.cargando=false;
            this.medicos = medicos
          
          })
  }
  buscar(termino:string){
    if(termino.length === 0){
      return this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos',termino)
          .subscribe(resp=>{
            this.medicos = resp;
          })
  }
  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal('medicos',medico._id,medico.img);
  }


}


