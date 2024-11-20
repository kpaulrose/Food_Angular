import dotenv from 'dotenv';
dotenv.config();
import { dbConnect } from './configs/database.config';
dbConnect();
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken"
import { images} from "./data"
import { UserModel } from './model/user.model';
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.get("/api/foods", (req, res) => {
    res.send(images);
})

app.get("/api/foods/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    res.send(images.find(item => item.id ==foodId ));
})

app.post("/api/user/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if the provided password matches the stored password
        if (user.password !== password) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            'your_secret_key', // Make sure to use an environment variable for the secret in production
            { expiresIn: '1h' }
        );

        // Respond with success and user details (excluding password)
        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address
            },
            token
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({
            success: false,
            message: "An error occurred during login"
        });
    }
});


app.post("/api/user/register", async (req, res) => {
    const { email, password, name, address } = req.body;

    try {
        // Check if the user already exists in the database
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "User already exists" 
            });
        }

        // Create a new user instance
        const newUser = new UserModel({
            name,
            email,
            address,
            password,
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message and user details (excluding password for security)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                address: newUser.address
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ 
            success: false, 
            message: "An error occurred during registration" 
        });
    }
});




const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})