import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderComponent } from './components/order/order.component';
import { ProductAddComponent } from './components/product/product-add/product-add/product-add.component';

const routes: Routes = [
  {path:'',component:LayoutComponent, children:[
  {path:'', component:HomeComponent},
  {path:'product-add', component:ProductAddComponent},
  {path:'orders',component:OrderComponent},
   ] },{path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
