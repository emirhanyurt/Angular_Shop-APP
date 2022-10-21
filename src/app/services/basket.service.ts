import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketModel } from '../models/basket';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baskets:BasketModel[] = []
  total:number = 0
  constructor(private httpClient:HttpClient,private toast:ToastrService,private orderService:OrderService) { }
   
  getList()
  {
    let api = "https://webapi.angulareducation.com/api/baskets/getlist"
    this.httpClient.get<ListResponseModel<BasketModel>>(api).subscribe((res)=>{
      this.baskets = res.data
      this.call()
    },(err)=>{
      console.log(err)
    })
    
  }
  addBasket(model:BasketModel):Observable<ResponseModel>{
    let api = "https://webapi.angulareducation.com/api/baskets/add"
    return this.httpClient.post<ResponseModel>(api,model)
      
  }
  deleteBasket(basket:BasketModel)
  {
    let api = "https://webapi.angulareducation.com/api/baskets/delete"
    return this.httpClient.post<ResponseModel>(api,basket)
  }
  updateBasket(basket:BasketModel)
  {
    let api = "https://webapi.angulareducation.com/api/baskets/update"
    return this.httpClient.post<ResponseModel>(api,basket)
  }
  call(){
     this.total = 0
     this.baskets.forEach(element =>{
       this.total =this.total + ( element.product.price * element.quantity)
     });
     return this.total
  }
  changeData(basket:BasketModel,quantity:number){
       
      //  let index = this.baskets.indexOf(basket);
      //  this.baskets[index].quantity = quantity;
      //  this.call()
  }
  payment(total:number)
  {  
    // if(this.total == total)
    // {
    //   let count = this.baskets.length
    //   this.orderService.addOrder(this.baskets)
    //   //this.baskets.splice(0,count)
    //   this.toast.success("Ödeme Başarılı Bir Şekilde Gerçekleşti","Bilgi")
      
    // }
    // this.call()
  }
}
