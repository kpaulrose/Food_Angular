import { connect } from 'mongoose';
import { FoodModel } from '../model/food.model';
import { images } from '../data';

export const dbConnect = () => {
    connect(process.env.MONGO_URI!)
        .then(() => console.log("Connected successfully to MongoDB"))
        .catch((error) => console.error("MongoDB connection error:", error));
};





// Function to populate the database with initial food data
export const seedFoods = async () => {
    try {
        const existingCount = await FoodModel.countDocuments();
        if (existingCount > 0) {
            console.log("Foods already populated");
            return;
        }

        await FoodModel.insertMany(images);
        console.log("Food data seeded successfully");
    } catch (error) {
        console.error("Error seeding food data:", error);
    }
};

