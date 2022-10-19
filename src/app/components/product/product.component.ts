import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  isAuth:boolean
  filterText:string = ""
  constructor(private toastr:ToastrService,private httpClient:HttpClient,private productService:ProductServiceService,private basketService:BasketService,private auht:AuthService) { }
  ngAfterContentChecked(): void {
    this.isAuth = this.auht.isAut
  }

  ngOnInit(): void {
    this.getList()
    //  this.products = this.productService.products
  }
  getList()
  {
   
    this.productService.getList().subscribe((res)=>{
      this.products = res.data
    })
  }
   addBasket(product:ProductModel)
   {
    let basketModel = new BasketModel()
    basketModel.product = product
    basketModel.quantity = parseInt((<HTMLInputElement>document.getElementById("quantity-" + product.name)).value);
    (<HTMLInputElement>document.getElementById("quantity-" + product.name)).value = "1"
    this.basketService.addBasket(basketModel)
    
   }
  }
