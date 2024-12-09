import { Schema, model } from 'mongoose';

// Define the CartItem schema
export interface CartItem {
  foodId: string;
  quantity: number;
  user: string; // Reference to the User model
}

export const CartItemSchema = new Schema<CartItem>({
  foodId: { type: String},
  quantity: { type: Number, default: 1 },
  user: { type: String },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

// Create the CartItem model
export const CartItemModel = model<CartItem>('cartItem', CartItemSchema);
