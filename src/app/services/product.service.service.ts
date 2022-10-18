import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  
  products:ProductModel[] = [
    {id:1,name:"Peynir",inventory:100, price:12.99 ,imageUrl:"https://www.peynircibaba.com/image/catalog/urunler/1008.jpg"},
    {id:2,name:"Zeytin",inventory:110, price:42.99 ,imageUrl:"https://www.organikgurmem.com/images/urunler/Mega-Siyah-Zeytin-1-KG-resim-930.jpg"},
    {id:3,name:"Tereyağı",inventory:120, price:124.99 ,imageUrl:"https://www.agazete.com.tr/files/uploads/news/default/20220804-tereyaginin-gercek-oldugunu-nasil-anlariz-959618-98885c364e7c728d1279.jpg"},
    {id:4,name:"Lavaş",inventory:130, price:9.99,imageUrl:"https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/05051773/05051773-2e6f99-1650x1650.jpg"},
    {id:5,name:"Yeşil Zeytin",inventory:140,price:13.99,imageUrl:"https://www.peynircibaba.com/image/catalog/urunler/1364.jpg"},
    {id:6,name:"Telefon Kablosu",inventory:150,price:29.99,imageUrl:"https://productimages.hepsiburada.net/s/10/500/9207755767858.jpg"},
    {id:7,name:"Priz",inventory:160,price:7.99,imageUrl:"https://cdn.cimri.io/image/1000x1000/gnsanfantasybeyaztopraklpriz_144399070.jpg"},
    {id:8,name:"Ekmek",inventory:170,price:5.00,imageUrl:"https://ankarahalkekmek.com.tr/wp-content/uploads/2020/11/normalekmek.jpg"}
  ]

  constructor(private toastTr:ToastrService) { }

  add(model:ProductModel):boolean
  {
    let length = this.products.filter(p=>p.name.toLocaleLowerCase() == model.name.toLocaleLowerCase()).length
    if(length == 0){
      this.products.push(model)
      this.toastTr.success( model.name+" İsimli Ürün Başarılı Bir Şekilde Eklendi","Bilgi")
    return true
    }
    else{
      this.toastTr.error( model.name+" İsimli Ürün Kayıtlarda Mevcut","Bilgi")
      return false
    }
   
  }
  getById(id:number):Observable<any>{
    console.log(id)
    let model: ProductModel = this.products.find(i => i.id == id)
    console.log(model)
    return of(model)
  }
  update(model : ProductModel)
  {
    let productModel:ProductModel = this.products.find(i => i.id == model.id)
    let index = this.products.indexOf(productModel)
    this.products[index] = model
  }
}
