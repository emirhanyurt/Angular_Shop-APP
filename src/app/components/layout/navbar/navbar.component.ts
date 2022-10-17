import { AfterContentChecked, Component, OnInit } from '@angular/core';
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
  constructor(private toastr:ToastrService,private basketService:BasketService,private authService:AuthService) { }
  

  ngOnInit(): void {
    this.baskets = this.basketService.baskets
  }
  ngAfterContentChecked(): void {
    this.total = this.basketService.total
  }
  login(){
    this.authService.login()
    this.toastr.info("Giriş Yapıldı")
    
   }
   logOut(){
     this.authService.logaut()
     this.toastr.warning("Çıkış Yapıldı")
     
   }
}
