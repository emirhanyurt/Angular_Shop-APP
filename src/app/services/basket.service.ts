import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from '../models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baskets:BasketModel[] = []
  total:number = 0
  constructor(private toast:ToastrService) { }

  addBasket(model:any){
    this.baskets.push(model)
    this.toast.info(model.name+" İsiml Ürün Sepete Eklendi")
    this.call()
  }
  deleteBasket(basket:BasketModel)
  {
    let index = this.baskets.indexOf(basket);
    this.baskets.splice(index,1)
    this.toast.info(basket.product.name+" Sepetinizden Silindi","Bilgi")
    this.call()
  }
  call(){
    this.total = 0
    this.baskets.forEach(element =>{
      this.total =this.total + ( element.product.price * element.quantity)
    });
    return this.total
  }
  changeData(basket:BasketModel,quantity:number){
       
       let index = this.baskets.indexOf(basket);
       this.baskets[index].quantity = quantity;
       this.call()
  }
  payment(total:number)
  {  
    if(this.total == total)
    {
      let count = this.baskets.length
      this.baskets.splice(0,count)
      this.toast.success("Ödeme Başarılı Bir Şekilde Gerçekleşti","Bilgi")
      this.call()
    }
  }
}
