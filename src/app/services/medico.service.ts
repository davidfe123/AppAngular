import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { Hospital } from '../models/hospitales.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class MedicoService {


  constructor( private http:HttpClient ) { }

  get token(){
    return localStorage.getItem('token')||''
  }
  get headers(){
    return{
      headers:{
        'x-token':this.token
      }
    }
  }

  obtenerMedicos(){
    const url = `${base_url}/medicos`
    return this.http.get(url,this.headers)
              .pipe(
                map( (resp:{ok:boolean,medicosdb:Medico[]}) =>{
                  return resp.medicosdb
                })
              )
  }

  obtenerMedicosById(id:string){
    const url = `${base_url}/medicos/${id}`
    return this.http.get(url,this.headers)
              .pipe(
                map( (resp:{ok:boolean,medicodb:Medico}) =>{
                  return resp.medicodb
                })
              )
  }

  crearMedico(nombre:string,hospitales:string){
    const url = `${base_url}/medicos`
    //console.log( medico.nombre +"serviciooo"+ medico.hospitales)
    return this.http.post(url,{nombre,hospitales},this.headers);
  }

  actualizarMedico(medico:Medico){

    const url = `${base_url}/medicos/${medico._id}`
    console.log(medico)
    return this.http.put(url,medico,this.headers)
  }

  borrarMedico(_id:string){
    const url = `${base_url}/medicos/${_id}`
    return this.http.delete(url,this.headers)
  }

}
