import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit,OnDestroy {

  public totalUsuarios:number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTem: Usuario[] = [];

  public imagenSubs:Subscription;
  public desde:number = 0;
  public cargando:boolean=true;

  constructor(private usuariosService:UsuarioService,
              private busquedasService:BusquedasService,
              public modalImagenService:ModalImagenService){

  }
  ngOnDestroy(): void {
    this.imagenSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarUsuarios();
    this.imagenSubs = this.modalImagenService.nuevaImagen
        .pipe(
          delay(100)
        )
        .subscribe(img=> this.cargarUsuarios());
  }

  cargarUsuarios(){
    this.cargando = true
    this.usuariosService.cargarUsuarios(this.desde)
    .subscribe( ({total,usuarios}) =>{
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTem = usuarios;
      this.cargando = false
    })
  }

  cambiarPagina(valor:number){
    this.desde += valor

    if(this.desde < 0){
      this.desde = 0;
    }else if( this.desde > this.totalUsuarios ){
      this.desde -= valor 
    }
    this.cargarUsuarios();
  }

  buscar(termino:string){

    if(termino.length == 0){
      return this.usuarios = this.usuariosTem;
    }

    this.busquedasService.buscar('usuarios', termino)
          .subscribe( (resp:Usuario[]) =>{
              this.usuarios = resp
              
          })
    return true;
  }

  eliminarUsuario(usuario:Usuario){

    if( usuario.uid === this.usuariosService.uid){
      return Swal.fire('Error', 'no puede borarse a si mismo','error')
    }
    

    Swal.fire({
      title: '¿borar usuario?',
      text: `esta apunto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
      // borar usuario
        this.usuariosService.eliminarUsuario(usuario)
              .subscribe(resp =>{
                Swal.fire(
                  'borrado',
                  'el usuario ha sido eliminado',
                  'success'
                )
              this.cargarUsuarios();
              })
      }
    })
    return true

  }

  cambiarRole(usuario:Usuario){
    this.usuariosService.guardarUsuario(usuario)
          .subscribe(resp=>{
            console.log(resp)
          });
  }

  abrirModal(usuario:Usuario){
    this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);
  }



}
