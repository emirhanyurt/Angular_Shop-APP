import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ProductModel } from '../models/product';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  products:ProductModel[] = []
 
  constructor(private toastTr:ToastrService,private httpClient:HttpClient) { }

  // add(model:ProductModel):boolean
  // {
  //   let length = this.products.filter(p=>p.name.toLocaleLowerCase() == model.name.toLocaleLowerCase()).length
  //   if(length == 0){
  //     this.products.push(model)
  //     this.toastTr.success( model.name+" İsimli Ürün Başarılı Bir Şekilde Eklendi","Bilgi")
  //   return true
  //   }
  //   else{
  //     this.toastTr.error( model.name+" İsimli Ürün Kayıtlarda Mevcut","Bilgi")
  //     return false
  //   }
   
  // }
  // getById(id:number):Observable<any>{
  //   console.log(id)
  //   let model: ProductModel = this.products.find(i => i.id == id)
  //   console.log(model)
  //   return of(model)
  // }
   update(model : ProductModel)
   {
     let productModel:ProductModel = this.products.find(i => i.id == model.id)
     let index = this.products.indexOf(productModel)
     this.products[index] = model
  }

  getList():Observable<ListResponseModel<ProductModel>>
  {
    let api = "https://webapi.angulareducation.com/api/products/getlist"
    return this.httpClient.get<ListResponseModel<ProductModel>>(api)
  }
}
