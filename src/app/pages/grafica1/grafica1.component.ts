import { Component, Input } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  
  public labels1: string[] = ['tiendas', 'online', 'mercado linre'];
  public data1 = [ 550, 400, 150 ] ;

  public labels2: string[] = ['tiendas', 'online', 'mercado linre'];
  public data2 = [ 350, 600, 150 ] ;

  public labels3: string[] = ['tiendas', 'online', 'mercado linre'];
  public data3 = [ 500, 200, 150 ] ;
  
}
