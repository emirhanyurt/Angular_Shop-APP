import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { BasketModel } from 'src/app/models/basket';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/services/basket.service';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, AfterContentChecked {
   baskets:BasketModel[] =[]
    total:number = 0
  constructor(private toastr:ToastrService,private basketService:BasketService) { }
  ngAfterContentChecked(): void {
    this.total = this.basketService.total
  }

  ngOnInit(): void {
    this.baskets = this.basketService.baskets
    
  }
 
  deleteBasket(basket:BasketModel)
  {
    this.basketService.deleteBasket(basket)
  }
  
  changeData(basket:BasketModel,quantity:any){
       this.basketService.changeData(basket, quantity.value)
  }
  
}
