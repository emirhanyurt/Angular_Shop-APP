import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';
import { ProductModel } from 'src/app/models/product';
import { ResponseModel } from 'src/app/models/responseModel';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { ProductServiceService } from 'src/app/services/product.service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit ,AfterContentChecked{
 
  products:ProductModel[]
  newQ:number = 0
  isAuth:boolean
  filterText:string = ""
  isLoad:boolean = true
  constructor(private spinner:NgxSpinnerService,private toastr:ToastrService,private httpClient:HttpClient,private productService:ProductServiceService,private basketService:BasketService,private auht:AuthService) { }
  ngAfterContentChecked(): void {
    this.isAuth = this.auht.isAut
    this.products = this.productService.products
  }

  ngOnInit(): void {
    
    
    this.getList()
    
    //  this.products = this.productService.products
  }
  getList()
  {

    this.productService.getList()
  }
   addBasket(product:ProductModel)
   {
    let basketModel = new BasketModel()
    let quantity:number = parseInt((<HTMLInputElement>document.getElementById("quantity-" + product.name)).value);
   
   
    if(product.inventoryQuantity < quantity ){
       this.newQ =quantity - 1
         this.toastr.error("En falza"+this.newQ+"ürün satın alabilirsiniz")
         return
    }
    (<HTMLInputElement>document.getElementById("quantity-" + product.name)).value = "1"
    basketModel.product = product
    basketModel.productId = product.id
    basketModel.quantity=quantity
    this.basketService.addBasket(basketModel).subscribe((res)=>{
       this.toastr.success(res.message)
       this.getList()  
       this.basketService.getList()
    
    },(err)=>{
      console.log(err)
    })
    
    
   }
  }
