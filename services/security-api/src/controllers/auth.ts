import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import express from 'express';

const prisma = new PrismaClient();

const register = async (req: express.Request, res: express.Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const { username, email, name, password } = req.body;
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                name: name,
                password: await bcrypt.hash(password, 10),
            },
        })
        res.status(200).json({user});
    } catch (err) {
        next(err)
    }
}

const login = async (req: express.Request, res: express.Response, next) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }
        const payload = {
            username: user.username,
            isAdmin: user.isAdmin,
            id: user.id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        res
        .cookie("access_token", token, {
            httpOnly: true, //It does not allow any other site to access the cookie
        })
        .status(200)
        .json({ message: `Logged in! Welcome ${user.name}` });
    } catch (err) {
        next(err)
    }
}
    


export { register,
         login };