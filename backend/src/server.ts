import express from 'express'
import cors from 'cors'
import FoodRouter from "./routers/food.router"
import UserRouter from "./routers/user.router"
import { dbConnect } from './configs/database.config'
import OrderRouter from './routers/order.router'

dbConnect();

const app = express();
const port = 5000;

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
app.use(express.json());
app.use('/api/foods', FoodRouter);
app.use('/api/users', UserRouter)
app.use('/api/orders', OrderRouter)


app.listen(port, () => {
    console.log("website is hosted on http://localhost:", port);
});

