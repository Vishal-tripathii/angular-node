import {Router} from 'express'
import jwt from "jsonwebtoken"
import {sample_users } from '../data';

const router = Router();
// in server.ts we've defined /api/users to the user router, so here we dont need to define that again


router.post('/login', (req, resp) => {
    const body = req.body; 
    // sent body as JSON (need to use app.use(express.json()))
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

  export default router;
  