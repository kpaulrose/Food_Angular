import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FoodService } from './../../service/foodservice.service';
import { Food } from './../../models/food';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-food-details',
  standalone: true,
  imports: [RouterModule, HttpClientModule, HeaderComponent],
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.scss'
})
export class FoodDetailsComponent implements OnInit {

  food!: Food;
  quantity: number = 1;
  user: any = null;
  constructor(private foodService: FoodService,private activatedRoute: ActivatedRoute, private cartService: CartService, private router: Router) {
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

    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } 
    

  }
  addToCart(food: Food) {
    this.cartService.updateCartItem(food.id,this.quantity , this.user.id).subscribe({
      next: () => {
        alert(`${food.name} has been added to the cart!`);
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
      }
    });
  }
  
}
