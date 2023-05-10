import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { RegisterForm } from '../interface/register.form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interface/login.form.interface';

declare const google:any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient,
              private router:Router){}

  logout(){
    localStorage.removeItem('token');
    const email = localStorage.getItem('email') || ''
    google.accounts.id.revoke( email,()=>{
      this.router.navigateByUrl('/login')
    })
  }

  validarToke():Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`,{
      headers:{
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
            'x-token': token
      }
    }).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token)
      }),
      map(resp => true),
      catchError(error=> of(false))
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

}
