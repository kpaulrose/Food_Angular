import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { DeliveryComponent } from './delivery/delivery.component';

const routes: Routes = [
  { path: '', component: CheckoutComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'delivery', component: DeliveryComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
