import { Router } from 'express'
import { sample_foods, sample_tags } from '../data';
import asyncHandler from 'express-async-handler'
import { FoodModel } from '../models/food.modal';

const router = Router();

router.get('/seed', asyncHandler(
    async (req, resp) => {
        const foodCount = await FoodModel.countDocuments();
        if (foodCount > 0) {
            resp.send("Seeding is already DONE!!");
            return;
        }

        await FoodModel.create(sample_foods);
        resp.send("new seed is DONE!!")
    }
))

// in server.ts we've defined /api/foods to the food router, so here we dont need to define that again

router.get('/', asyncHandler(
    async (req, resp) => {
        const foods = await FoodModel.find(); // will get all values from database
        resp.send(foods)
    }
))
// router.get('/', (req, resp) => {
//     resp.send(sample_foods);
// });

router.get('/search/:searchTerm', asyncHandler(
    async (req, resp) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i') // i is for case insensitive
        const foods = await FoodModel.find({ name: { $regex: searchRegex } })
        resp.send(foods);
    }
))

// router.get('/search/:searchTerm', (req, resp) => {
//     const searchTerm = req.params.searchTerm;
//     const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
//     resp.send(foods)
// });

// router.get('/tags', (req, resp) => {
//     resp.send(sample_tags)
// });

router.get("/tags", asyncHandler(
    async (req, res) => {
        const tags = await FoodModel.aggregate([
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 });

        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all);
        res.send(tags);
    }
))

// router.get('/tag/:tagName', (req, resp) => {
//     const tagName = req.params.tagName;
//     const foods = sample_foods.filter(food => food.tags?.includes(tagName));
//     resp.send(foods)
// });

router.get('/tag/:tagName', asyncHandler(
    async(req, resp) => {
        const foods = await FoodModel.find({tags: req.params.tagName})
        resp.send(foods)
    }
))

// router.get('/:foodId', (req, resp) => {
//     const foodId = req.params.foodId;
//     const foods = sample_foods.find(food => food.id === foodId);
//     resp.send(foods)
// });

router.get('/:foodId', asyncHandler(
    async(req, resp) => {
        const foods = await FoodModel.findById(req.params.foodId)
        resp.send(foods);
    }
))

export default router;