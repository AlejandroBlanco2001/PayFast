import jwt from 'jsonwebtoken';
import express from 'express';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const verifyToken = (req:express.Request, res: express.Response) => {
    jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, (err, decoded) => {
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

const verifyUser = async (req:express.Request, res: express.Response, next) => {
    verifyToken(req, res);

    if (req['user'].id == req.params.userid || req['user'].isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden" });
    }
};

//verificar si un usuario es dueño de su método
const verifyUserMetodo = async (req:express.Request, res: express.Response, next) => {
    verifyToken(req, res);
    const metodo = await prisma.metodopago.findMany({
        where: {
            id: parseInt(req.params.id),
        }
    }); 
    if (req['user'].id == metodo['id'] || req['user'].isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden" });
    }
};

export { verifyAdmin, verifyUser, verifyUserMetodo };
