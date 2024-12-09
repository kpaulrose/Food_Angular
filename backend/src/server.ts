import dotenv from 'dotenv';
dotenv.config();
import { dbConnect, seedFoods } from './configs/database.config';
dbConnect();
seedFoods();
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken"
import { UserModel } from './model/user.model';
import { FoodModel } from './model/food.model';
import { CartItemModel } from './model/cart.model';
import { OrderModel } from './model/order.model';
import { v4 as uuidv4 } from 'uuid';
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.get('/api/foods', async (req, res) => {
    try {
        const foods = await FoodModel.find();
        res.json(foods);
    } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ message: 'An error occurred while fetching foods' });
    }
});

app.get("/api/foods/:foodId", async (req, res) => {
    const foodId = req.params.foodId;

    try {
        // Find the food by its ID in the database
        const food = await FoodModel.findById(foodId);

        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        res.json(food);
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        res.status(500).json({ message: 'An error occurred while fetching the food item' });
    }
});

app.post("/api/food_id", async (req, res) => {
    const {foodId}= req.body;

    try {
        // Find the food by its ID in the database
        const food = await FoodModel.findById(foodId);

        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        res.json(food);
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        res.status(500).json({ message: 'An error occurred while fetching the food item' });
    }
});


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

app.put("/api/user/update", async (req, res) => {
    const { id, name, email, password, address } = req.body;

    try {
        // Find the user by ID
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if the updated email already exists in the database
        if (email) {
            const existingUser = await UserModel.findOne({ email });
            if (existingUser && existingUser._id.toString() !== id) {
                return res.status(400).json({
                    success: false,
                    message: "The email address is already in use by another account.",
                });
            }
            user.email = email;
        }

        // Update other user details if provided
        if (name) user.name = name;
        if (password) user.password = password; // Ideally hash the password here
        if (address) user.address = address;

        // Save updated user information to the database
        await user.save();

        // Respond with success and updated user details (excluding password)
        res.json({
            success: true,
            message: "User details updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
            },
        });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating user details",
        });
    }
});


app.put('/api/cart', async (req, res) => {
    const { foodId, quantity, user } = req.body;

    try {
        // Check if the item already exists in the cart
        const existingCartItem = await CartItemModel.findOne({
            foodId,
            user,
        });

        if (existingCartItem) {
            // Update quantity if it exists
            existingCartItem.quantity += quantity || 1;
            await existingCartItem.save();
            return res.json(existingCartItem);
        }

        // Create new cart item
        const newCartItem = new CartItemModel({
            foodId,
            quantity: quantity || 1,
            user,
        });

        await newCartItem.save();

        res.status(201).json(newCartItem);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'An error occurred while adding item to the cart' });
    }
});

app.put('/api/cart/decrement', async (req, res) => {
    const { foodId, user } = req.body;

    try {
        // Check if the item exists in the cart
        const existingCartItem = await CartItemModel.findOne({ foodId, user });

        if (!existingCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Decrement the quantity
        existingCartItem.quantity -= 1;

        // If quantity drops to 0 or less, remove the item
        if (existingCartItem.quantity <= 0) {
            await existingCartItem.deleteOne();
            return res.json({ message: 'Cart item removed successfully' });
        }

        // Save updated cart item
        await existingCartItem.save();
        res.json(existingCartItem);

    } catch (error) {
        console.error('Error decrementing item in the cart:', error);
        res.status(500).json({ message: 'An error occurred while updating the cart' });
    }
});

app.put('/api/cart/increment', async (req, res) => {
    const { foodId, user } = req.body;

    try {
        // Check if the item exists in the cart
        const existingCartItem = await CartItemModel.findOne({ foodId, user });

        if (!existingCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Decrement the quantity
        existingCartItem.quantity += 1;
        // Save updated cart item
        await existingCartItem.save();
        res.json(existingCartItem);

    } catch (error) {
        console.error('Error decrementing item in the cart:', error);
        res.status(500).json({ message: 'An error occurred while updating the cart' });
    }
});





app.delete('/api/cart/delete', async (req, res) => {
    const { foodId, user } = req.query; // Use query parameters instead
    console.log('Received foodId:', foodId);
console.log('Received user:', user);


    if (!foodId || !user) {
        return res.status(400).json({ message: 'Missing required fields: foodId and/or user' });
    }

    try {
        const deletedCartItem = await CartItemModel.findOneAndDelete({ foodId, user });

        if (!deletedCartItem) {
            return res.status(404).json({ message: 'Item not found in the cart' });
        }

        return res.status(200).json({
            message: 'Item successfully removed from the cart',
            deletedCartItem
        });
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        return res.status(500).json({ message: 'An error occurred while deleting item from the cart' });
    }
});






app.get('/api/cart/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const cartItems = await CartItemModel.find({ user: userId });
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'An error occurred while fetching cart items' });
    }
});


app.put('/api/order', async (req ,res) => {
    const { user, totalAmount, totalQuantity } = req.body;
    console.log(user);
    console.log(totalAmount);
    console.log(totalQuantity);

    try {
        // Step 1: Get the user's cart items
        const cartItems = await CartItemModel.find({ user: user});

        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'Cart is empty. Cannot proceed with the order.' });
        }

        // Step 2: Generate a unique orderId (you can modify this logic as per your needs)
        const orderId = uuidv4();

        // Step 3: Calculate the total amount and total quantity (if not passed from frontend)
    

        const orderItems = cartItems.map((cartItem) => {
            return {
                foodId: cartItem.foodId,
                quantity: cartItem.quantity,
                user: cartItem.user,
            };
        });

        // Step 4: Create the order
        const order = new OrderModel({
            user: user,
            orderId: orderId,
            totalQuantity: totalQuantity , // Use the provided total if available
            totalAmount: totalAmount,     // Use the provided total if available
            items: orderItems,
        });

        // Save the order to the database
        await order.save();

        // Step 5: Clear the user's cart after successful order creation
        await CartItemModel.deleteMany({ user: user });

        // Return the created order
        res.json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error placing the order:', error);
        res.status(500).json({ message: 'An error occurred while placing the order' });
    }
});


app.get('/api/orders/:user', async (req, res) => {
    const { user } = req.params;
    console.log(user);

    try {
        // Fetch all orders for the given user
        const orders = await OrderModel.find({ user }).sort({ createdAt: -1 }); // Sort by most recent orders

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        // Return the fetched orders
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'An error occurred while fetching orders' });
    }
});







const port = process.env.PORT || 5003;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})