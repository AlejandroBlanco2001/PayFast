import {Router} from 'express';
import {register, login} from '../controllers/auth';
import { check } from "express-validator";
const router = Router();

//CRUD operations
router.post('/register',[
    check("email", "Please input a valid email")
        .isEmail(),
    check("password", "Please input a password with a min length of 6")
        .isLength({min: 6})
], register);
router.post('/login', login);

export default router;