import express from "express";
import cors from "cors";
import { sample_foods, sample_tags } from "./data";

const app = express();
const port = 5000;

app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200"]

}));

app.get('/api/foods', (req, resp) => { // replicate to getAll function()
  resp.send(sample_foods)
});

app.get('/api/foods/search/:searchTerm', (req, resp) => { // searching method
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  resp.send(foods);
});

app.get('/api/foods/tags', (req, resp) => { // getting by tags
  resp.send(sample_tags)
});

app.get('/api/foods/tags/:tagName', (req, resp) => {
  const tagName = req.params.tagName;
  const foods = sample_foods.filter(item =>
    item.tags?.includes(tagName));
  resp.send(foods);
});

app.get('/api/foods/:FoodId', (req, resp) => {
  const foodId = req.params.FoodId;
  const foods = sample_foods.find(item => item.id === foodId);

  resp.send(foods);
})



app.listen(5000, () => {
  console.log("Server is running on port: ", port)
})
