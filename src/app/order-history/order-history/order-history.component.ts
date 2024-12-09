import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { OrderService } from '../../service/order.service';
import { Order } from '../../../../backend/src/model/order.model';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../service/foodservice.service';
import { Food } from '../../models/food';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {
user: any;
userId!: string;
orders: Order[] = [];

  constructor(private orderService: OrderService, private foodService:FoodService){

  }
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.userId= this.user.id;
    }
    this.fetchOrders();

  }

fetchOrders(): void {
  this.orderService.getItem(this.userId).subscribe({
    next: async (orders) => {
      try {
        const foodRequests = []; // Collect all food fetch requests
        
        // Iterate over orders and items to fetch food details
        for (const order of orders) {
          for (const item of order.items) {
            const foodRequest = firstValueFrom(this.foodService.getFoodByIdWithoutParameter(item.foodId));
            foodRequests.push(
              foodRequest.then((food) => {
                item.foodDetails = food; // Add food details directly to the item
              })
            );
          }
        }

        // Wait for all food details to be fetched
        await Promise.all(foodRequests);
        this.orders = orders; // Assign fully populated orders to the component property
        console.log('Orders with food details:', this.orders);
      } catch (error) {
        console.error('Error fetching food details:', error);
      }
    },
    error: (error) => {
      console.error('Error fetching orders:', error);
    }
  });
}

  
}
