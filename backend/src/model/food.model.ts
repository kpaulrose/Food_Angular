import { Schema, model } from 'mongoose';

export interface Food {
    name: string;
    price: number;
    cookTime: string;
    imageUrl: string;
}

export const FoodSchema = new Schema<Food>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    cookTime: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});


export const FoodModel = model<Food>('food', FoodSchema);
