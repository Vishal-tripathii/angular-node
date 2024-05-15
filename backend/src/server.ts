import express from 'express'
import cors from 'cors'
import { sample_foods, sample_tags, sample_users } from './data';
import jwt from "jsonwebtoken"

const app = express();
const port = 5000;

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.use(express.json());

app.get('/api/foods', (req, resp) => {
    resp.send(sample_foods);
});

app.get('/api/foods/search/:searchTerm', (req, resp) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    resp.send(foods)
});

app.get('/api/foods/tags', (req, resp) => {
    resp.send(sample_tags)
});

app.get('/api/foods/tag/:tagName', (req, resp)=> {
    const tagName = req.params.tagName;
    const foods = sample_foods.filter(food => food.tags?.includes(tagName));
    resp.send(foods)
});

app.get('/api/foods/:foodId', (req, resp) => {
    const foodId = req.params.foodId;
    const foods = sample_foods.find(food => food.id === foodId);
    resp.send(foods)
});

app.post('/api/users/login', (req, resp) => {
  const body = req.body; // sent body as JSON (need to use app.use(express.json()))
  // const {email, password} = req.body
  const user = sample_users.find(user => user.email === body.email && user.password === body.password)
  if(user) {
    resp.send(generateTokenResponse(user))
  }
  else {
    resp.status(400).send("!!! username or password is not valid !!!")
  }
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign( // it takes 3 args, what to encode, secretkey, expiry
    {email: user.email, isAdmin: user.isAdmin},
    "SecretKey",
    {expiresIn: '30d'}
  );

  user.token = token;
  return user;
}

app.listen(port, () => {
    console.log("website is hosted on http://localhost:",port);
});

////////////////////////////////
