import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { CartService } from '../../service/cart.service';
import { FoodService } from '../../service/foodservice.service'; // Ensure you have this service
import { CartItem } from '../../models/cart_item';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  user: any;

  constructor(
    private cartService: CartService,
    private foodService: FoodService, private router: Router
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.fetchOrderDetails();
    }
  }

  async fetchOrderDetails(): Promise<void> {
    try {
      const items = await firstValueFrom(this.cartService.getCartItems(this.user.id));
      this.cartItems = items;
      await this.preloadFoodDetails();
    } catch (err) {
      console.error('Error fetching order details:', err);
    }
  }

  async preloadFoodDetails(): Promise<void> {
    try {
      const foodRequests = this.cartItems.map(async (item) => {
        const food = await firstValueFrom(this.foodService.getFoodByIdWithoutParameter(item.foodId));
        item.foodDetails = food; // Store food details in each cart item
      });

      await Promise.all(foodRequests);
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


  confirmOrder() {
    this.router.navigate(['/checkout/payment'], {
      state: { totalQuantity: this.totalQuantity, totalPrice: this.totalPrice }
    });
  }
}
