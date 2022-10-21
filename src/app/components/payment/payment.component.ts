import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterContentChecked {

 total:number
 paymetForm:FormGroup
  @Output() myEvent:EventEmitter<any> = new EventEmitter();
  constructor(private toastr:ToastrService,private basketService : BasketService,private formBuilder:FormBuilder) { }
  ngAfterContentChecked(): void {
    this.total= this.basketService.total
  }

  ngOnInit(): void {
    this.createPaymentForm()
  }
  createPaymentForm()
  {
    this.paymetForm = this.formBuilder.group({
      "id": [0],
      "date": [Date()],
      "cartNumber": ["",Validators.required],
      "cartOwner": ["",Validators.required],
      "expirationDate": ["",Validators.required],
      "cvv": ["",Validators.required]
    })
  }
  payment()
  {  
    if(this.paymetForm.valid)
    {
      let model = this.paymetForm.value
      this.basketService.payment(model)
      document.getElementById("ModalClose").click();
    }
    else{
      this.toastr.info("Lütfen Tüm Alanları Doldurunuz")
    }
 
    
  }
 
}
