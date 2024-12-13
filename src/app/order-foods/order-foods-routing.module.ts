import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderFoodComponent } from './order-food/order-food.component';

const routes: Routes = [
  {path:'', component:OrderFoodComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderFoodsRoutingModule { }
