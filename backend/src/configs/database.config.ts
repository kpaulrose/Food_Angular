import { connect } from 'mongoose';

export const dbConnect = () => {
    connect(process.env.MONGO_URI!)
        .then(() => console.log("Connected successfully to MongoDB"))
        .catch((error) => console.error("MongoDB connection error:", error));
};
