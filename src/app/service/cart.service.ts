import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CART_CHANGE, DECREMENT_CART, DELETE_CART, GET_CART, INCREMENT_CART, ORDER } from '../api/url';
import { Food } from '../models/food';
import { CartItem } from '../models/cart_item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
 


  constructor(private http: HttpClient) {}

  // Get all cart items for a user
  getCartItems(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(GET_CART + userId);
  }

  // Update quantity of a cart item
  updateCartItem(foodId: string, quantity: number, user:string){
   const  body ={foodId,quantity,user};
    return this.http.put(CART_CHANGE,body);
  }

  deleteCartItems(foodId: string, user: string) {
    const url = `${DELETE_CART}?foodId=${foodId}&user=${user}`;
    return this.http.delete(url); // No body needed
}
   decrementCartItem(foodId: string, user:string){
    const  body ={foodId,user};
     return this.http.put(DECREMENT_CART,body);
   }

   incrementCartItem(foodId: string, user:string){
    const  body ={foodId,user};
     return this.http.put(INCREMENT_CART,body);
   }


   updateTotal(cartItems: CartItem[]): { totalPrice: number; totalQuantity: number } {
    let totalPrice = 0;
    let totalQuantity = 0;
  
    cartItems.forEach(item => {
      if (item.foodDetails) {
        totalPrice += item.foodDetails.price * item.quantity;
        totalQuantity += item.quantity;
      }
    });
  
    return { totalPrice, totalQuantity };
  }
  
  
  orderItem(user:string, totalAmount: number, totalQuantity: number){
    const  body ={user,totalAmount,totalQuantity};
     return this.http.put(ORDER,body);
   }
 
}
