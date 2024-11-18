import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../models/cart_item';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItems: CartItem[] = [];
  constructor(private cartService: CartService) {

    this.cartService.getItem().subscribe((cartItem) =>
      this.cartItems = cartItem);
  }
  decreaseQuantity(id: number) {
    const item = this.cartItems.find(item => item.id == id);
    if (item) {
      item.quantity = item.quantity - 1;
      if (item.quantity == 0) {
        this.cartService.removeItem(item.id);
      }
      this.cartService.updateQuantity(id, item.quantity);
    }
  }
  increaseQuantity(id: number) {
    const item = this.cartItems.find(item => item.id == id);
    if (item) {
      item.quantity = item.quantity + 1;
      this.cartService.updateQuantity(id, item.quantity);
    }

  }

  getTotalQuantity(): number {
    let totalQuantity = 0;
    this.cartItems.forEach(item => {
      totalQuantity = totalQuantity + item.quantity
    });
    return totalQuantity;
  }

  getTotalPrice(): number{
  let totalPrice =0;
  this.cartItems.forEach(item =>{
    totalPrice= totalPrice + (item.quantity * item.price)
  });
  return totalPrice;
  }

}
