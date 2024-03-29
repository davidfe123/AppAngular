import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})
export class RegisterComponent{

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['david',[Validators.required,Validators.minLength(3)]],
    email: ['davistes@gmail.com', [Validators.required,Validators.email]],
    password: ['123456',Validators.required],
    password2: ['123456',Validators.required],
    terminos: [true,Validators.required]
  },{
    validators: this.passwordsIguales('password','password2')
  });


  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService,
              private router:Router){
  }


  crearUsuario(){
  
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return;
    }

    //realizar el posteo

    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe(resp=>{
          
          this.router.navigateByUrl('/login')

        },(err)=>{
          //SI SUSEDE UN ERROR
          Swal.fire('Error',err.error.msg,'error');
        });

  }

  campoNoValido(campo:string):boolean{
    
    if(this.registerForm.get(campo).invalid && this.formSubmitted ){
      return true;
    }
    return false;
  }

  contrasenasNoValidas(){

    const pas1 = this.registerForm.value.password
    const pas2 = this.registerForm.value.password2
    if(pas1 !== pas2 && this.formSubmitted){
      return true;
    }else{
      return false
    }

  }
  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1Name:string,pass2Name:string){
    return (formGroup:FormGroup)=>{
        const pass1Control = formGroup.get(pass1Name);
        const pass2Control = formGroup.get(pass2Name);

        if(pass1Control.value === pass2Control.value){
          pass2Control.setErrors(null);
        }else{
          pass2Control.setErrors({noEsIgual:true})
        }
    }
  }

  

}
