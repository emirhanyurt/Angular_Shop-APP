import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { ProductServiceService } from 'src/app/services/product.service.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  updateForm:FormGroup
  productModel:ProductModel[] =[]
  constructor(private productService:ProductServiceService,private formBuilder:FormBuilder,private activatiRoute:ActivatedRoute,private rout:Router) { }
  
  ngOnInit(): void {
    this.creatUpdateForm()
    this.getById()
    
    
  }
  creatUpdateForm(){
    this.updateForm = this.formBuilder.group({
      'id':[0,[Validators.required]],
      'name':['',[Validators.required, Validators.minLength(3)]],
      'inventoryQuantity':[0,[Validators.required, Validators.minLength(1)]],
      'price':[,[Validators.required, Validators.min(1)]],
      'imageUrl':[,[Validators.required, Validators.minLength(5)]],
    })

  }
  getById(){
    let id:number = 0
        
    // this.activatiRoute.params.subscribe((p)=>{
    //     id = p['id']
    //     console.log(id)
    // })
    // this.productService.getById(id).subscribe((res)=>
    // {
    //   this.productModel = res
    //   this.updateForm.controls['id'].setValue(res.id)
    //   this.updateForm.controls['name'].setValue(res.name)
    //   this.updateForm.controls['inventoryQuantity'].setValue(res.inventory)
    //   this.updateForm.controls['price'].setValue(res.price)
    //   this.updateForm.controls['imageUrl'].setValue(res.imageUrl)
    
    
    // },(err)=>{
      
    // })
  }
  update(){
    if(this.updateForm.valid){
      this.productService.update(this.updateForm.value)
      this.rout.navigate(['/'])
    }else{
      alert('Bilgiler Eksik')
    }
  }
}
