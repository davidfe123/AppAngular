import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { RegisterForm } from '../interface/register.form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interface/login.form.interface';
import { Usuario } from '../models/usuario.model';

declare const google:any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario:Usuario;

  constructor(private http:HttpClient,
              private router:Router){}

  get token():string{
    return localStorage.getItem('token') || '';
  }
  get uid():string{
    return this.usuario.uid || '';
  }

  logout(){
    localStorage.removeItem('token');
    const email = localStorage.getItem('email') || ''
    google.accounts.id.revoke( email,()=>{
      this.router.navigateByUrl('login')
    })
  }

  validarToke():Observable<boolean>{
    

    return this.http.get(`${base_url}/login/renew`,{
      headers:{
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
            'x-token': this.token
      }
    }).pipe(
      map((resp:any)=>{
        const {nombre,email,google,role,img = '',uid} = resp.usuario;
        this.usuario = new Usuario(nombre,email,'',google,role,img,uid);
        localStorage.setItem('token',resp.token)
        return true
      }),
      catchError(error => {
          return of(false)
      })
    );

  }

  crearUsuario(formData:RegisterForm){
    return this.http.post(`${base_url}/usuario`,formData)
              .pipe(
                tap((resp:any) => {
                  localStorage.setItem('token',resp.token)
                })
              );
  }

  login(formData:LoginForm){
    
    return this.http.post(`${base_url}/login`,formData)
                .pipe(
                  tap((resp:any) => {
                    localStorage.setItem('token',resp.token)
                  })
                );
  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
    .pipe(
      tap((resp:any) => {
        localStorage.setItem('token',resp.token)
        localStorage.setItem('email',resp.email)
      })
    )
  }

  actualizarPerfil(data:{ email:string,nombre:string,role:string }){
      data = {
        ...data,
        role:this.usuario.role
      }

      return this.http.put(`${base_url}/usuario/${this.uid}`,data,{
        headers:{'x-token':this.token
        }
      }
  )}


}
