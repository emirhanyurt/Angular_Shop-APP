import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { BasketModel } from 'src/app/models/basket';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/services/basket.service';
import { ProductServiceService } from 'src/app/services/product.service.service';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, AfterContentChecked {
   baskets:BasketModel[] =[]
    total:number = 0
    newQ:number = 0
  constructor(private productService:ProductServiceService,private toastr:ToastrService,private basketService:BasketService) { }
  ngAfterContentChecked(): void {
    this.total = this.basketService.total
    this.baskets = this.basketService.baskets
    
  }

  ngOnInit(): void {
    
    this.getList()
    
  }
  getList(){
    this.basketService.getList()
  }
 
  deleteBasket(basket:BasketModel)
  {
    this.basketService.deleteBasket(basket).subscribe((res)=>{
      this.getList()
      this.productService.getList()
      this.toastr.info("Ürün silindi")
    },(err)=>{
      console.log(err)
    })
  }
  
  changeData(basket:BasketModel,quantity:any){
    if(basket.product.inventoryQuantity + basket.quantity -quantity.value < 0 ){
        this.newQ =quantity - 1
        this.toastr.error("En falza"+this.newQ+"ürün satın alabilirsiniz")
        return
   }
    basket.quantity = quantity.value
    this.basketService.updateBasket(basket).subscribe((res)=>{
      this.getList()
      this.productService.getList()
    },(err)=>{
      console.log(err)
    })
      
  }
  
}
