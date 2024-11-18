import { Food } from "./food";

export class CartItem {
  constructor(public food: Food) {
    this.quantity = 1; // Default quantity is 1
    this.price;
  }
  quantity: number = 1;

  // Make price a getter that recalculates price based on quantity
  get price(): number {
    return this.food.price * this.quantity;
  }

  id: number = this.food.id;
}
