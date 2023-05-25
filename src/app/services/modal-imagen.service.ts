import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultalModal:boolean = true;
  public tipo:'usuarios'|'medicos'|'hospitales'
  public id:string;
  public img?:string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultalModal
  }

  abrirModal(
      tipo: 'usuarios'|'medicos'|'hospitales',
      id:string,
      img : string = 'no-img'
  ){
    this._ocultalModal = false;
    this.tipo = tipo;
    this.id = id;

    //localhost:3000/api/upload/medicos/img
    if (img.includes('https')){
      this.img = img;
    }else{
      this.img = `${baseUrl}/upload/${tipo}/${img}`
    }
    // this.img = img
  }

  cerrarModal(){
    this._ocultalModal = true
  }

  constructor() { }
}
