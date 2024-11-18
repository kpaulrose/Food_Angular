import { ActivatedRoute, RouterModule } from '@angular/router';
import { FoodserviceService } from './../../service/foodservice.service';
import { Food } from './../../models/food';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../models/cart_item';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-food-details',
  standalone: true,
  imports: [RouterModule,HttpClientModule],
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.scss'
})
export class FoodDetailsComponent implements OnInit {

  food!: Food;
  constructor(private foodService: FoodserviceService,private activatedRoute: ActivatedRoute, private cartService: CartService) {
  }
  ngOnInit(): void {

    this.activatedRoute.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.foodService.getFoodById(params['id']).subscribe({
            next: (food) => {
              this.food = food; // Assign the fetched food item to this.food
            },
            error: (error) => {
              console.error('Error fetching food by ID:', error);
            },
          });
        }
      },
      error: (error) => {
        console.error('Error with route params:', error);
      },
    });
    

  }
  addToCart(food: Food){
    this.cartService.addItem(new CartItem(food));
    alert(`${food.name} has been added to the cart!`);
  }
}
