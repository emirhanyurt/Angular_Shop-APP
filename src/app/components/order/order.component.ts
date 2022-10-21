import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order';
import { OrderModelDto } from 'src/app/models/OrderDto';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders:OrderModelDto[] = []
  constructor(private orderService:OrderService) { }
  

  ngOnInit(): void {
    
    this.getList()
  }
  getList()
  {
    this.orderService.getList().subscribe((res)=>{
      this.orders = res.data
      console.log(this.orders)
      console.log(res)
    },(err)=>{
      console.log(err)
    })
  }

}
