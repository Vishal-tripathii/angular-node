import {Router} from 'express'
import asyncHandler from 'express-async-handler'
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../constants/order_status';
import auth from './../middleware/auth.mid'

const router = Router();
router.use(auth)

router.post('/create', asyncHandler(
    async(req: any, resp: any) => {
        const requestOrder = req.body;

        if(requestOrder.items.length <= 0) {
            resp.status(HTTP_BAD_REQUEST).send('The cart is Empty!!');
            return
        }
        await OrderModel.deleteOne( 
            {
                user: req.user.id,
                status: OrderStatus.NEW
            }
        );

        const newOrder = new OrderModel({...requestOrder, user: req.user.id})
        await newOrder.save();
        resp.send(newOrder)
    }
));

export default router;