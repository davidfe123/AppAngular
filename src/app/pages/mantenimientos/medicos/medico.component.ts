import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospitales.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html'
})
export class MedicoComponent implements OnInit {
  

  public medicoForm:FormGroup
  public hospitales:Hospital[]=[];

  public medicoSeleccionado:Medico;
  public hospitalSeleccionado:Hospital;

  constructor(private fb:FormBuilder,
              private hospitalesService:HospitalesService,
              private medicosService:MedicoService,
              private router:Router,
              private activatedRoute:ActivatedRoute )
  {}


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) =>{this.cargarMedico(id)});
    //this.medicosService.obtenerMedicosById()

    this.medicoForm = this.fb.group({
      nombre:['',Validators.required],
      hospital:['',Validators.required]
    })
    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
                  .subscribe(hospitalId =>{
                    this.hospitalSeleccionado = this.hospitales.find(h=> h._id === hospitalId);
                  })
    
  }

  cargarMedico(id:string){
    //this.medicosService.obtenerMedicosById()
    if(id === 'nuevo'){
      return;
    }
    this.medicosService.obtenerMedicosById(id).pipe(delay(100))
              .subscribe( medico =>{
                const{nombre,hospitales:{_id}} = medico;
                this.medicoSeleccionado = medico;
                this.medicoForm.setValue({nombre,hospital:_id})
              },error =>{
                return this.router.navigateByUrl(`/dashboard/medicos`)
              })
  }

  cargarHospitales(){
    this.hospitalesService.cargarHopitales()
        .subscribe( resp =>{
          this.hospitales = resp
        })
  }

  guardarMedico(){


    if(this.medicoSeleccionado){
      //actualizar
      const nombre =  this.medicoForm.value.nombre
      const hospitales = this.medicoForm.value.hospital
      const data = {
        nombre,
        hospitales,
        _id: this.medicoSeleccionado._id
      }
      console.log(data)
      this.medicosService.actualizarMedico(data)
              .subscribe(resp=>{
                Swal.fire('Actualizado',`${nombre} actualizado correctamente`,'success');
              })
    }else{
      const nombre =  this.medicoForm.value.nombre
      const hospitales =  this.medicoForm.value.hospital

    this.medicosService.crearMedico(nombre,hospitales)
                      .subscribe((resp:any) => {
                        Swal.fire('Creado',`${nombre} creado correctamente`,'success');
                        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
                      })
  }
    }
}
