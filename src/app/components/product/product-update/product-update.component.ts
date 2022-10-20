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
  productModel:ProductModel
  image:string
  constructor(private toastr:ToastrService,private productService:ProductServiceService,private formBuilder:FormBuilder,private activatiRoute:ActivatedRoute,private rout:Router) { }
  
  ngOnInit(): void {
    this.creatUpdateForm()
    this.getById()
    
    
  }
  deleteProduct(){
    if(this.updateForm.valid){
      this.productService.delete(this.updateForm.value).subscribe((res)=>{
        this.rout.navigate(['/'])
        this.toastr.success(this.updateForm.value.name +"isimli Ürün silindi")
      },(err)=>{
        console.log(err)
      })
      
    }
  }
  creatUpdateForm(){
    this.updateForm = this.formBuilder.group({
      'id':[0,[Validators.required]],
      'name':['',[Validators.required, Validators.minLength(3)]],
      'inventoryQuantity':[0,[Validators.required, Validators.minLength(1)]],
      'price':[,[Validators.required, Validators.min(1)]],
      'imageUrl':[,[Validators.required, Validators.minLength(5)]],
      'codeGuid':[,[Validators.required, Validators.minLength(5)]],
    })

  }
  getById(){
    let guid:string = ""
        
     this.activatiRoute.params.subscribe((params)=>{
         guid = params['value']
         
     })
     this.productService.getById(guid).subscribe((res)=>
     {
       this.productModel =  res.data
       this.updateForm.controls['id'].setValue(res.data.id)
       this.updateForm.controls['name'].setValue(res.data.name)
       this.updateForm.controls['inventoryQuantity'].setValue(res.data.inventoryQuantity)
       this.updateForm.controls['price'].setValue(res.data.price)
       this.updateForm.controls['imageUrl'].setValue(res.data.imageUrl)
       this.updateForm.controls['codeGuid'].setValue(res.data.codeGuid)
    
    
     },(err)=>{
      console.log(err)
     })
  }
  update(){
    if(this.updateForm.valid){
      this.productService.update(this.updateForm.value).subscribe((res)=>{
        this.rout.navigate(['/'])
        this.toastr.success(this.updateForm.value.name +"isimli Ürün Güncellendi")
      },(err)=>{
        console.log(err)
      })
      
    }else{
      alert('Bilgiler Eksik')
    }
  }
}
