import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userName!: number;
  constructor(private cartService: CartService){

  }
  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const user = JSON.parse(userJson);
        this.userName = user?.name;
      }
    }

  }



  Logout(): void {
    alert("the cart items will be deleted when you log out");
    this.cartService.clearCart();
  }
}


