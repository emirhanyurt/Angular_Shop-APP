import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { singleResponseModule } from '../models/singleResponseModule';
import { TokenModel } from '../models/token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAut:boolean
  constructor(private spinner:NgxSpinnerService,private router:Router,private httpclient:HttpClient,private toastr:ToastrService) { }
  ifAuthenticated(){
    if(localStorage.getItem("token"))
    {
      return  true
    }
    else{
      return  false
    }
  }
  login(loginModel:Login):boolean{
    let api = "https://webapi.angulareducation.com/api/users/login";
      this.httpclient.post<singleResponseModule<TokenModel>>(api,loginModel).subscribe((res)=>{
        localStorage.setItem("Token", res.data.token)
        this.toastr.success(res.message)
        this.isAut = true
        this.router.navigate(["/"])
        return true
      },(err)=>{
        this.spinner.hide()
        console.log(err)
        this.toastr.error(err.error)
       return false
      })
      return false
  }
  logaut(){
    localStorage.removeItem("Token")
    this.isAut = false
    this.router.navigate(['/'])
    this.toastr.warning("Çıkış Yapıldı")
  }
}
