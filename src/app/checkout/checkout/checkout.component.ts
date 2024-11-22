import { Component } from '@angular/core';
import { CartItem } from '../../models/cart_item';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cartItems: CartItem[] = [];
  user: any;
  totalQuantity: number = 0;
  totalPrice: number = 0;
  constructor(private cartService: CartService) {

    this.cartService.getItem().subscribe((cartItems) =>{
      this.cartItems = cartItems;
      this.totalQuantity = cartService.getTotalQuantity(cartItems);
      this.totalPrice = cartService.getTotalPrice(cartItems);
    }
  );

  const userJson = localStorage.getItem('user');
  if (userJson) {
    this.user = JSON.parse(userJson);
  }
  }
}
