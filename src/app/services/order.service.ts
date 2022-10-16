import { Injectable } from '@angular/core';
import { BasketModel } from '../models/basket';
import { OrderModel } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders:OrderModel[] = []
  constructor() { }

  addOrder(model:BasketModel[])
  {
    let order = new OrderModel()
    order.baskets = model
    order.date = Date()
    this.orders.push(order)
  }
}
