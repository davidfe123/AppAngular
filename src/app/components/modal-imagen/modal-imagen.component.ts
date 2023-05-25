import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public imagenSubir:File;
  public imagenTem:any = null;
  

  constructor(public modalImagenService:ModalImagenService,
              private uploadFileService:FileUploadService){
  }

  cerrarModal(){
    this.modalImagenService.cerrarModal();
    this.imagenTem = null;
  }

  cambiarImagen(file:File){
    this.imagenSubir = file;
    if(!file){
      return this.imagenTem = null
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imagenTem = reader.result;
    }
  }

  subirImg(){
    const tipo = this.modalImagenService.tipo
    const id = this.modalImagenService.id
    this.uploadFileService.actualizarFoto(this.imagenSubir,tipo,id)
    .then( img=> {
      Swal.fire('Imagen subida','la imagen fue subida correctamente','success');
      this.modalImagenService.nuevaImagen.emit(img)
      this.cerrarModal();
    }).catch(err=>{
      Swal.fire('error',err.error.msg,'error')
    });
  }

}
