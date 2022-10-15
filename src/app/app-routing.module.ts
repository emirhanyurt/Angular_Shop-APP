import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductAddComponent } from './components/product/product-add/product-add/product-add.component';

const routes: Routes = [{path:'', component:HomeComponent},{path:'product-add', component:ProductAddComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
