import { Component, HostListener } from '@angular/core';
import { Food } from '../../models/food';
import { FoodService } from '../../service/foodservice.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, HeaderComponent],
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent {

  foods: Food[] = [];
  allFoods: Food[] = [];
  itemsToShow: number = 10;  // How many items to show initially

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.getFood().subscribe({
      next: (foods: Food[]) => {
        this.allFoods = foods;
        this.loadMoreFoods();
      },
      error: (error) => {
        console.error('Error fetching food data:', error);
      },
      complete: () => {
        console.log('Food data fetching complete.');
      }
    });
    
  }

  loadMoreFoods(): void {
    // Load the next batch of food items and append them to the current list
    const nextFoods = this.allFoods.slice(this.foods.length, this.foods.length + this.itemsToShow);
    this.foods = [...this.foods, ...nextFoods];
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has reached or surpassed the bottom of the page
    if (scrollPosition >= documentHeight - 1) {
      this.loadMoreFoods();
    }
  }
}
