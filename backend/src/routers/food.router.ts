import {Router} from 'express'
import { sample_foods, sample_tags } from '../data';
import asyncHandler from 'express-async-handler'
import { FoodModel } from '../models/food.modal';

const router = Router();

router.get('/seed', asyncHandler(
    async(req, resp) => {
        const foodCount = await FoodModel.countDocuments();
        if(foodCount > 0) {
            resp.send("Seeding is already DONE!!");
            return;
        }

        await FoodModel.create(sample_foods);
        resp.send("new seed is DONE!!")
    }
))

// in server.ts we've defined /api/foods to the food router, so here we dont need to define that again
router.get('/', (req, resp) => {
    resp.send(sample_foods);
});

router.get('/search/:searchTerm', (req, resp) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    resp.send(foods)
});

router.get('/tags', (req, resp) => {
    resp.send(sample_tags)
});

router.get('/tag/:tagName', (req, resp)=> {
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(food => food.tags?.includes(tagName));
    resp.send(foods)
});

router.get('/:foodId', (req, resp) => {
    const foodId = req.params.foodId;
    const foods = sample_foods.find(food => food.id === foodId);
    resp.send(foods)
});

export default router;