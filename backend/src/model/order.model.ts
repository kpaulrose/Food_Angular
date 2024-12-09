import { Schema, model, Document } from 'mongoose';
import { Food } from './food.model';

// Define the OrderItem schema
interface OrderItem {
  foodDetails?: Food;
  foodId: string;
  quantity: number;
  user: string;
}

// Define the Order schema
interface Order extends Document {
  user: string;
  totalQuantity: number;
  totalAmount: number;
  items: OrderItem[];
  orderId: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<Order>({
  user: { type: String, required: true },
  totalQuantity: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  items: [{
    foodId: { type: String, required: true },
    quantity: { type: Number, required: true },
    user: { type: String, required: true },
  }],
  orderId: { type: String, required: true },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

const OrderModel = model<Order>('Order', OrderSchema);

export { OrderModel, Order };
