import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';
import { ProductModel } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 
  products:ProductModel[] = [
    {name:"Peynir", price:12.99 ,imageUrl:"https://www.peynircibaba.com/image/catalog/urunler/1008.jpg"},
    {name:"Zeytin", price:42.99 ,imageUrl:"https://www.organikgurmem.com/images/urunler/Mega-Siyah-Zeytin-1-KG-resim-930.jpg"},
    {name:"Tereyağı", price:124.99 ,imageUrl:"https://www.agazete.com.tr/files/uploads/news/default/20220804-tereyaginin-gercek-oldugunu-nasil-anlariz-959618-98885c364e7c728d1279.jpg"},
    {name:"Lavaş", price:9.99,imageUrl:"https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/05051773/05051773-2e6f99-1650x1650.jpg"},
    {name:"Yeşil Zeytin",price:13.99,imageUrl:"https://www.peynircibaba.com/image/catalog/urunler/1364.jpg"},
    {name:"Telefon Kablosu",price:29.99,imageUrl:"https://productimages.hepsiburada.net/s/10/500/9207755767858.jpg"},
    {name:"Priz",price:7.99,imageUrl:"https://cdn.cimri.io/image/1000x1000/gnsanfantasybeyaztopraklpriz_144399070.jpg"},
    {name:"Ekmek",price:5.00,imageUrl:"https://ankarahalkekmek.com.tr/wp-content/uploads/2020/11/normalekmek.jpg"}
  ]
 baskets:BasketModel[] = []
 @Output() myEvent:EventEmitter<any> = new  EventEmitter()
  constructor(private toastr:ToastrService) { }

  ngOnInit(): void {
  }
   addBasket(product:ProductModel)
   {
    let basketModel = new BasketModel()
    basketModel.product = product
    basketModel.quantity = parseInt((<HTMLInputElement>document.getElementById("quantity-" + product.name)).value);
    (<HTMLInputElement>document.getElementById("quantity-" + product.name)).value = "1"
    this.baskets.push(basketModel)
    this.myEvent.emit({data: this.baskets})
    this.toastr.success(product.name+" Sepetinize Eklendi","Bilgi")
   }
  }
