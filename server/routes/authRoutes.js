import express from 'express';
import {Registeruser} from '../auth/register.js';
import {Loginuser} from '../auth/login.js';
const router = express.Router();

router.post('/register', Registeruser);
router.post('/login', Loginuser);
// router.get('/protect',getsecret);

export  {router as authRoutes};
