import { Router } from 'express'
import jwt from "jsonwebtoken"
import { sample_users } from '../data';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs'

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
      resp.status(HTTP_BAD_REQUEST).send("!!! username or password is not valid !!!")
    }
  }
));

router.post('/register', asyncHandler(
  async(req, resp) => {
    const {name, email, password, address} = req.body;
    const alreadyUser = await UserModel.findOne({email}) // to find if there is already a user with this email
    if(alreadyUser) {
      resp.status(HTTP_BAD_REQUEST).send("User already exists !!")
      return;
    }

    // creating a hashed passwords for saving in database
    const encryptedPassword = await bcrypt.hash(password, 10); // it takes 2 parameters, one is the password another is the salting length
    
    const newUser: User  = {
      id: '',
      email: email.toLowerCase(),
      password: encryptedPassword,
      name,
      address,
      isAdmin: false
    }

    const dbUser = await UserModel.create(newUser);
    resp.send(generateTokenResponse(dbUser));
  }
))

const generateTokenResponse = (user: any) => {
  const token = jwt.sign( // it takes 3 args, what to encode, secretkey, expiry
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    "SecretKey",
    { expiresIn: '30d' }
  );

  user.token = token;
  console.log(token, "this is token");
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token
  }
}

export default router;
