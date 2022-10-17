import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAut:boolean = false
  constructor() { }
  ifAuthenticated(){
    if(this.isAut)
    {
      return true
    }
    else{
      return false
    }
  }
  login(){
    this.isAut = true
  }
  logaut(){
    this.isAut = false
  }
}
