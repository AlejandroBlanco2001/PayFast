import { PrismaClient } from "@prisma/client";
import express from 'express';

const prisma = new PrismaClient();

const getUser = async (req: express.Request, res: express.Response, next) => {
    const username = req.params.username;
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({user});
    } catch (err) {
        next(err)
    }
}

const getUsers = async (req: express.Request, res: express.Response, next) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({users});
    } catch (err) {
        next(err)
    }
}

const updateUser = async (req: express.Request, res: express.Response, next) => {
    const id = parseInt(req.params.id);
    try {
        const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: req.body.name || undefined,
                email: req.body.email || undefined,
                username: req.body.username || undefined,
                password: req.body.password || undefined,
                isAdmin: undefined,
            },
        });
        res.status(200).json({user});
    } catch (err) {
        next(err)
    }
}

const deleteUser = async (req: express.Request, res: express.Response, next) => {
    const id = parseInt(req.params.id);
    try {
        const user = await prisma.user.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json({user});
    } catch (err) {
        next(err)
    }
}

export {
    getUser,
    getUsers,
    updateUser,
    deleteUser
}