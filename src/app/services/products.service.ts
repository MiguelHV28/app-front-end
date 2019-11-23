import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoM } from '../models/models';
import { Observable } from 'rxjs';

const URL_PRODUCTS='https://angular-products-mahv.firebaseio.com/productos.json';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { 


  }

  getAll(){
    return this.http.get(URL_PRODUCTS);
  }

  getCategory(category:string){
    return new Observable(observer=>{
      this.http.get(URL_PRODUCTS).subscribe((data:ProductoM[])=>{
        const filter = data.filter(item=>item.categoria==category || item.categoria.indexOf(category)>0);
        observer.next(filter);
      })
    });
  }

  getByCode(code:string){
    return new Observable(observer=>{
      this.getAll().subscribe((data:ProductoM[])=>{
        const filter = data.filter(item=>item.codigo==code);
        observer.next(filter[0]);
      })
    });
  }

  getByDescription(description:string){
    return new Observable(observer=>{
      console.log('recibe getByDescription',description)
      this.getAll().subscribe((data:ProductoM[])=>{
        const filter = data.filter(item=> item.descripcion.toLowerCase().indexOf(description.toLowerCase())>=0 );
          console.log(filter);  
          observer.next(filter);
      })
    });
  }
}
