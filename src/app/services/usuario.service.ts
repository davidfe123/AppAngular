import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, delay, map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { RegisterForm } from '../interface/register.form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interface/login.form.interface';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interface/cargar-usuarios.interface';

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

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }

  get role():'ADMIN_ROLE'|'USER_ROLE'{
    return this.usuario.role;
  }

  guardarLocalStorage(token:string,menu:any){
    localStorage.setItem('token',token);
    localStorage.setItem('menu',JSON.stringify(menu));
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    const email = localStorage.getItem('email') || ''
    google.accounts.id.revoke( email,()=>{
      this.router.navigateByUrl('/login')
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
        this.guardarLocalStorage(resp.token,resp.menu);
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
                    this.guardarLocalStorage(resp.token,resp.menu);
                  })
                );
  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token})
    .pipe(
      tap((resp:any) => {
        this.guardarLocalStorage(resp.token,resp.menu);
        localStorage.setItem('email',resp.email)
      })
    )
  }

  actualizarPerfil(data:{ email:string,nombre:string,role:string }){
      
    data = {
      ...data,
      role:this.usuario.role
    }

      return this.http.put(`${base_url}/usuario/${this.uid}`,data,this.headers)
  }
  

  cargarUsuarios(desde:number = 0){
    const url = `${base_url}/usuario?desde=${desde}`;
    return this.http.get<CargarUsuario>(url,this.headers)
            .pipe(
              delay(100),
              map(resp =>{
                const usuarios = resp.usuarios.map(
                    user => new Usuario(user.nombre,user.email,'',user.google,user.role,user.img,user.uid)
                );
                return {
                  total:resp.total,
                  usuarios:usuarios
                }
              })
            )
  }

  eliminarUsuario(usuario:Usuario){
    const url = `${base_url}/usuario/${usuario.uid}`
    return this.http.delete(url,this.headers)
  }

  guardarUsuario(usuario:Usuario){
      
    return this.http.put(`${base_url}/usuario/${usuario.uid}`,usuario,this.headers)
}


}
