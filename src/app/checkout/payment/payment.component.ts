import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { HeaderComponent } from "../../header/header.component";
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{
  totalPrice: number =0;
  totalQuantity: number=0;
  user: any;
  
  constructor(private cartService:CartService, private orderService:OrderService, private router: Router){

  }
  ngOnInit(): void {
    const state = window.history.state;
    this.totalQuantity = state.totalQuantity || 0;
    this.totalPrice = state.totalPrice || 0;

    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
}

selectedPayment: string | null = null; // Holds the currently selected payment method

  selectPayment(method: string) {
    this.selectedPayment = method; // Update the selected payment method
  }

  confirmPayment() {
    this.orderService.orderItem(this.user.id, this.totalPrice, this.totalQuantity).subscribe({
      next: (response) => {
        // Handle success response
        console.log('Order confirmed:', response);
       
        this.router.navigate(['/checkout/delivery']);
      },
      error: (error) => {
        // Handle error response
        console.error('Error placing the order:', error);
        alert('There was an error processing your payment. Please try again.');
      },
      complete: () => {
        // This is an optional callback if you want to handle completion logic
        console.log('Order processing completed.');
      }
    });    
  }


}
