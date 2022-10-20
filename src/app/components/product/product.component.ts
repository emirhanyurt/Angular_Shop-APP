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
  isAuth:boolean
  filterText:string = ""
  isLoad:boolean = true
  constructor(private spinner:NgxSpinnerService,private toastr:ToastrService,private httpClient:HttpClient,private productService:ProductServiceService,private basketService:BasketService,private auht:AuthService) { }
  ngAfterContentChecked(): void {
    this.isAuth = this.auht.isAut
  }

  ngOnInit(): void {
    
    
    this.getList()
    
    //  this.products = this.productService.products
  }
  getList()
  {
    this.spinner.show();
    this.productService.getList().subscribe((res)=>{
      this.spinner.hide
      this.products = res.data
      
    },(err)=>{
      this.spinner.hide
      if(err.status == "404"){
        this.toastr.error(err.statusText)
      }else{
        console.log(err)
      }
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
