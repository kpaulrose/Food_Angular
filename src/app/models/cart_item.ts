import { Food } from "./food";

export interface CartItem {
    foodId: string;
    quantity: number;
    user: string; 
    foodDetails?: Food;
  }