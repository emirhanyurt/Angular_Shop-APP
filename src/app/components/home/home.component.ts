import { AfterContentChecked, Component, OnInit } from "@angular/core";
import { BasketModel } from "src/app/models/basket";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector:"app-home",
    templateUrl:"home.component.html"

})

export class HomeComponent implements OnInit,AfterContentChecked{
    isAut:boolean = false
    constructor(private authService:AuthService){}
    ngAfterContentChecked(): void {
        this.isAut = this.authService.isAut
        
    }
   
    ngOnInit(): void{
        this.isAut = this.authService.isAut
    }
}