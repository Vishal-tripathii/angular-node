import { Router } from 'express'
import jwt from "jsonwebtoken"
import { sample_users } from '../data';
import asyncHandler from 'express-async-handler';
import { UserModel } from '../models/user.model';

const router = Router();

router.get('/seed', asyncHandler(
  async (req, resp) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
      resp.send("Seeding is already DONE");
      return;
    }
    await UserModel.create(sample_users);
    resp.send("new Seed is DONE")
  }
))
// in server.ts we've defined /api/users to the user router, so here we dont need to define that again
router.post('/login', asyncHandler(
  async (req, resp) => {
    const body = req.body;
    // sent body as JSON (need to use app.use(express.json()))
    const {email, password} = req.body
    const user = await UserModel.findOne({ email, password })
    if (user) {
      resp.send(generateTokenResponse(user))
    }
    else {
      resp.status(400).send("!!! username or password is not valid !!!")
    }
  }
));

const generateTokenResponse = (user: any) => {
  const token = jwt.sign( // it takes 3 args, what to encode, secretkey, expiry
    { email: user.email, isAdmin: user.isAdmin },
    "SecretKey",
    { expiresIn: '30d' }
  );

  user.token = token;
  return user;
}

export default router;
