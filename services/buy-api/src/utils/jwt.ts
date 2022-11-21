import jwt from 'jsonwebtoken';
import express from 'express';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const verifyToken = (req:express.Request, res: express.Response) => {
    jwt.verify(req.cookies.access_token, process.env.JWT_SECRET || 'my-secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req['user'] = decoded;
    });
};

const verifyAdmin = (req:express.Request, res: express.Response, next) => {
    verifyToken(req, res);
    if (req['user'].isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden" });
    }
};

const verifyUser = async (
    req: express.Request,
    res: express.Response,
    next
    ) => {
    verifyToken(req, res);
    if (!req["user"]) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(req.params);
    const userId = req.params["id"] || req.body[""] || req.query["id"];
    console.log("userId: ", userId, " req['user'].id: ", req["user"].id);
    if (req["user"].id == userId || req["user"].isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden" });
    }
};

//verificar si un usuario es dueño de su método
const verifyTransaccion = async (req:express.Request, res: express.Response, next) => {
    verifyToken(req, res);
    const userID = req.body.id | +req.params.id | +req.query.id;
    if(req['user'].id === userID){
        try{
            const metodo = await prisma.metodopago.findUnique({
                where: {
                    id: parseInt(req.body.metodoId),
                }
            });
            if (req['user'].id == metodo['userId'] || req['user'].isAdmin) {
                next();
            } else {
                return res.status(403).json({ message: "This payment method is not yours" });
            }
        }catch(err){
            console.log(err);
            return res.status(403).json({ message: "Not payment method found with this id" });
        }
    }else{
        return res.status(403).json({ message: "Forbidden" });
    }
};

export { verifyAdmin, verifyTransaccion, verifyUser };
