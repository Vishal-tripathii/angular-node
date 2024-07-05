import {Router} from 'express'
import { sample_foods, sample_tags } from '../data';

const router = Router();

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