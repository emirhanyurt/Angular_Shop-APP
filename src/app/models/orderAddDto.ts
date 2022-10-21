
import { BasketModel } from "./basket";
import { PaymentModel } from "./payment";

export class OrderAddDto{
    payment:PaymentModel
    baskets:BasketModel[]
}