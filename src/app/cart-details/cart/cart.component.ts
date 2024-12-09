import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { CartService } from '../../service/cart.service';
import { FoodService } from '../../service/foodservice.service'; // Make sure you have this service to fetch food by ID
import { CartItem } from '../../models/cart_item';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  user: any;

  constructor(
    private cartService: CartService,
    private foodService: FoodService
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.fetchCartItems();
    }
  }

  fetchCartItems(): void {
    if (this.user) {
      this.cartService.getCartItems(this.user.id).subscribe({
        next: (items) => {
          this.cartItems = items;
          this.preloadFoodDetails();
        },
        error: (err) => {
          console.error('Error fetching cart items:', err);
        }
      });
    }
  }


  async preloadFoodDetails(): Promise<void> {
    try {
      const foodRequests = this.cartItems.map(async (item) => {
        const food = await firstValueFrom(this.foodService.getFoodByIdWithoutParameter(item.foodId));
        item.foodDetails = food; // Store food details in each cart item
      });

      // Wait for all the food details to be loaded
      await Promise.all(foodRequests);
      // Calculate and assign totals
      const totals = this.cartService.updateTotal(this.cartItems);
      this.totalPrice = totals.totalPrice;
      this.totalQuantity = totals.totalQuantity;
    } catch (err) {
      console.error('Error fetching food details:', err);
    }
  }


  getPrice(price: number, quantity: number): number {
    return price * quantity;
  }

  decreaseQuantity(id: string): void {
    const item = this.cartItems.find(item => item.foodId === id);
    if (item && item.quantity > 0) {
      item.quantity -= 1;
      this.cartService.decrementCartItem(id, this.user.id).subscribe({
        next: () => {
          // Calculate and assign totals
          const totals = this.cartService.updateTotal(this.cartItems);
          this.totalPrice = totals.totalPrice;
          this.totalQuantity = totals.totalQuantity;
          this.fetchCartItems();
        },
        error: (err) => {
          console.error('Error decrementing cart item:', err);
        }
      });
    }
  }

  increaseQuantity(id: string): void {
    const item = this.cartItems.find(item => item.foodId === id);
    if (item) {
      item.quantity += 1;
      this.cartService.incrementCartItem(id, this.user.id).subscribe({
        next: () => {
          // Calculate and assign totals
          const totals = this.cartService.updateTotal(this.cartItems);
          this.totalPrice = totals.totalPrice;
          this.totalQuantity = totals.totalQuantity;

        },
        error: (err) => {
          console.error('Error incrementing cart item:', err);
        }
      });
    }
  }


  
}
