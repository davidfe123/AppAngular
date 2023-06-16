import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interface/cargar-usuarios.interface';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospitales.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http:HttpClient) { }

  get token(){
    return localStorage.getItem('token') || ''
  }

  get headers(){
    return{
      headers:{
        'x-token':this.token
      }
    }
  }

  private trasformarUsuarios( resultados:any[]):Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre,user.email,'',user.google,user.role,user.img,user.uid)
    )
  }

  private trasformHospitales(resultados:any[]):Hospital[]{
    return resultados;
    
  }

  private trasformMedicos(resultados:any[]):Medico[]{
    return resultados;
    
  }

  buscar(
    tipo:'usuarios' | 'medicos' | 'hospitales',
    termino:string = ''
  ){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`
    return this.http.get<any[]>(url,this.headers)
            .pipe(
              map( (resp:any) => {
                switch (tipo) {

                  case 'usuarios':
                      return this.trasformarUsuarios(resp.resultados)
                    break;
                  case 'hospitales':
                      return this.trasformHospitales(resp.resultados)
                    break;
                    case 'medicos':
                      return this.trasformMedicos(resp.resultados)
                    break;
                    
                  default:
                    return []; 
                    break;
                }
              })
            )
  }      
}
