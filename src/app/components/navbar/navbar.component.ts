import { Component, OnInit } from '@angular/core';
import { BasketModel } from 'src/app/models/basket';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
   baskets:BasketModel[] = []
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.baskets = this.basketService.baskets
  }

}
