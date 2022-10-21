import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ProductModel } from '../models/product';
import { ResponseModel } from '../models/responseModel';
import { singleResponseModule } from '../models/singleResponseModule';

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
   getById(guid:string):Observable<singleResponseModule<ProductModel>>{
    let api = "https://webapi.angulareducation.com/api/products/getById?guid=" + guid;
    let Token = localStorage.getItem("Token")
    return this.httpClient.get<singleResponseModule<ProductModel>>(api,{
      headers: new HttpHeaders({"Authorization":"Bearer " + Token})
    })
   }
   update(model : ProductModel):Observable<ResponseModel>
   {
     let api = "https://webapi.angulareducation.com/api/products/update"
     let Token = localStorage.getItem("Token")
    return this.httpClient.post<ResponseModel>(api,model,{
      headers: new HttpHeaders({"Authorization":"Bearer " + Token})
    })
  }
  delete(model : ProductModel):Observable<ResponseModel>
   {
     let api = "https://webapi.angulareducation.com/api/products/delete"
     let Token = localStorage.getItem("Token")
    return this.httpClient.post<ResponseModel>(api,model,{
      headers: new HttpHeaders({"Authorization":"Bearer " + Token})
    })
  }


  getList()
  {
    let api = "https://webapi.angulareducation.com/api/products/getlist"
    this.httpClient.get<ListResponseModel<ProductModel>>(api).subscribe((res)=>{

      this.products = res.data
      
      
    },(err)=>{
 
      if(err.status == "404"){
        this.toastTr.error(err.statusText)
      }else{
        console.log(err)
      }
    })
  }
  add(productsModel:ProductModel):Observable<ResponseModel>
  {
    let api = "https://webapi.angulareducation.com/api/products/add";
    let Token = localStorage.getItem("Token")
    return this.httpClient.post<ResponseModel>(api,productsModel,{
      headers: new HttpHeaders({"Authorization":"Bearer " + Token})
    })
  }
}
