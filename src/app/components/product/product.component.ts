import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';
import { ProductModel } from 'src/app/models/product';
import { BasketService } from 'src/app/services/basket.service';
import { ProductServiceService } from 'src/app/services/product.service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 
  products:ProductModel[]

  constructor(private toastr:ToastrService,private productService:ProductServiceService,private basketService:BasketService) { }

  ngOnInit(): void {
    this.products = this.productService.products
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
