import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospitales.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  public totalReg:number;

  constructor(private http:HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || ''
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }


  cargarHopitales(desde:number = 0){
    const url = `${base_url}/hospitales?desde=${desde}`
    return this.http.get(url,this.headers)
            .pipe(
              map( (resp: {ok:boolean,hospitaledb:Hospital[],valor:number} ) => {
                this.totalReg = resp.hospitaledb.length
                return resp.hospitaledb
              }),
            )
  }

  crearHospital(nombre:string){
    const url = `${base_url}/hospitales`;
    return this.http.post(url,{nombre},this.headers)
                    
  }

  editarHospital(_id:string,nombre:string){
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url,{nombre},this.headers)
                    
  }

  eliminarHospital(_id:string){
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url,this.headers)
                    
  }


}
