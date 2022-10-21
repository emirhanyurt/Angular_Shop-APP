import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketModel } from '../models/basket';
import { ListResponseModel } from '../models/listResponseModel';
import { OrderModel } from '../models/order';
import { OrderModelDto } from '../models/OrderDto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }

  getList():Observable<ListResponseModel<OrderModelDto>>
  {
    let api = "https://webapi.angulareducation.com/api/Orders/getList"
    return this.httpClient.get<ListResponseModel<any>>(api)
  }
}
