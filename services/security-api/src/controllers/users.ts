import { PrismaClient } from "@prisma/client";
import express from 'express';

const prisma = new PrismaClient();

const getUser = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({user});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

const getUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({users});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

const updateUser = async (req: express.Request, res: express.Response) => {
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
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

const deleteUser = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    try {
        const user = await prisma.user.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json({user});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

export {
    getUser,
    getUsers,
    updateUser,
    deleteUser
}