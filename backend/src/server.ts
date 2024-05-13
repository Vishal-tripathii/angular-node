import express from 'express'
import cors from 'cors'
import { sample_foods, sample_tags } from './data';

const app = express();
const port = 1111;

app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200"]
}));

app.get('/api/foods', (req, resp) => {
  resp.send(sample_foods);
});

app.get('/api/foods/search/:searchTerm', (req, resp) => {
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  resp.send(foods);
});

app.get('/api/foods/tags', (req, resp) => {
  resp.send(sample_tags);
});

app.get('/api/foods/tags/:tagName', (req, resp) => {
  const tag = req.params.tagName;
  const foods = sample_foods.filter(food => food.tags?.includes(tag));
  resp.send(foods);
});

app.get('/api/foods/:foodId', (req, resp) => {
  const foodId = req.params.foodId;
  const foods = sample_foods.find(food => food.id === foodId);
  resp.send(foods);
});

app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
})
