import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../models/cart_item';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  constructor(private cartService: CartService) {

    this.cartService.getItem().subscribe((cartItem) =>{
      this.cartItems = cartItem;
      this.updateCartSummary(this.cartItems);
    }
  );
  }


  updateCartSummary(items:CartItem[]) {
    this.totalQuantity = this.cartService.getTotalQuantity(items);
    this.totalPrice = this.cartService.getTotalPrice(items);
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


}
 