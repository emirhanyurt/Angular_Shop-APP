import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from 'src/app/models/basket';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterContentChecked {
   baskets:BasketModel[] = []
   total:number = 0
   isAut:boolean=false
  constructor(private route:Router,private toastr:ToastrService,private basketService:BasketService,private authService:AuthService) { }
  

  ngOnInit(): void {
    this.baskets = this.basketService.baskets
    this.isAut = this.authService.ifAuthenticated()
  }
  ngAfterContentChecked(): void {
    this.total = this.basketService.total
    this.isAut = this.authService.isAut
  }
  
   logOut()
   { 
    this.authService.logaut()
    this.isAut = this.authService.ifAuthenticated()
    
    
   }
}
