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

  
    
  }

 
