
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken"
import { images, users } from "./data"
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

app.post("/api/user/login", (req, res) => {
    const body = req.body;
    const user = users.find(user => user.email === body.email && user.password === body.password);

    if (user) {
        const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
        res.send( {
            id: user.id,
            email: user.email,
            name: user.name,
            address: user.address,
            token: token
          });
    } else {
        res.status(400).send("Invalid credentials");
    }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})