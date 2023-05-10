import { Token } from '@angular/compiler';
import { Component,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { LoginForm } from 'src/app/interface/login.form.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn:ElementRef;

  public formSubmit = false;

  constructor(private router:Router,
              private fb:FormBuilder,
              private usuarioService:UsuarioService){
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '88097472023-aauprle98ftesjl7arkjem2n1nj3tl2u.apps.googleusercontent.com',
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response:any){
    console.log("Encoded jwt id token:"+response.credential);
    this.usuarioService.loginGoogle(response.credential)
        .subscribe(resp=>{
          this.router.navigateByUrl('/dashboard')
        })
  }

  public loginForm:FormGroup= this.fb.group({
    email:[localStorage.getItem('email')|| '' ,[Validators.required,Validators.email]],
    password:['',Validators.required],
    remember:[false]
  })


  login(){
    
    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp=>{
      if(this.loginForm.value.remember){
        localStorage.setItem('email',this.loginForm.value.email)
      }else{
        localStorage.removeItem('email')
      }
      this.router.navigateByUrl('/dashboard')
    },(err)=>{
      Swal.fire('Error', err.error.msg,'error');
    });

    //console.log(this.loginForm.value);
  }

  
}
