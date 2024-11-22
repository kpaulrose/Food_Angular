import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart_item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // BehaviorSubject to manage the cart items
  private itemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    this.loadCartFromLocalStorage();
  }

  // Load items from local storage on service initialization
  private loadCartFromLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedItems = localStorage.getItem('cartItems');
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        this.itemsSubject.next(parsedItems); // Emit the loaded items
      }
    }
  }

  // Save current cart items to local storage
  private saveCartToLocalStorage(items: CartItem[]) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cartItems', JSON.stringify(items));
    }
  }

  // Return the cart items as an observable
  getItem(): Observable<CartItem[]> {
    return this.itemsSubject.asObservable();
  }


  addItem(addedItem: CartItem) {
    const currentItems = this.itemsSubject.value; // Get the current cart items
  
    // Check if the item already exists in the cart
    const existingItem = currentItems.find(item => item.id === addedItem.id);
  
    let updatedItems: CartItem[];
  
    if (existingItem) {
      // If the item exists, increase the quantity
      updatedItems = currentItems.map(item =>
        item.id === addedItem.id 
          ? { 
              ...item, 
              quantity: item.quantity + 1, 
              price: item.food.price * (item.quantity + 1) // Recalculate price
            }
          : item
      );
    } else {
      // If the item doesn't exist, add it to the cart
      updatedItems = [...currentItems, addedItem];
    }
  
    // Emit the updated items array to the subscribers
    this.itemsSubject.next(updatedItems);
  
    // Save the updated cart to local storage
    this.saveCartToLocalStorage(updatedItems);
  }
  
  
  // Remove an item from the cart and update the observable
  removeItem(id: number) {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.filter((item) => item.id !== id);

    this.itemsSubject.next(updatedItems); // Emit updated cart
    this.saveCartToLocalStorage(updatedItems); // Save to local storage
  }

  // Update the quantity of a specific item and update the observable
  updateQuantity(id: number, quantity: number) {
    const currentItems = this.itemsSubject.value;
    const updatedItems = currentItems.map((item) =>
      item.id === id ? { ...item, quantity:quantity,price: item.food.price * quantity } : item
    );

    this.itemsSubject.next(updatedItems); // Emit updated cart
    this.saveCartToLocalStorage(updatedItems); // Save to local storage
  }

  getTotalQuantity(items:CartItem[]): number {
    let totalQuantity = 0;
    items.forEach(item => {
      totalQuantity = totalQuantity + item.quantity
    });
    return totalQuantity;
  }

  getTotalPrice(items:CartItem[]): number{
  let totalPrice =0;
  items.forEach(item =>{
    totalPrice= totalPrice + (item.quantity * item.food.price)
  });
  return totalPrice;
  }

  clearCart(){
    this.itemsSubject.next([]); // Emit an empty array to reset the cart
  this.saveCartToLocalStorage([]); // Clear the cart in local storage
  }

}
 
