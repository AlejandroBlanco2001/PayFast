import { PrismaClient } from "@prisma/client";
import express from 'express';

const prisma = new PrismaClient();

export const getBanco = async (req: express.Request, res: express.Response, next) => {
    const id = parseInt(req.params.id);
    try {
        const banco = await prisma.banco.findUnique({
            where: {
                id: id,
            },
        });
        if (!banco) {
            return res.status(404).json({message: "Banco not found"});
        }
        res.status(200).json({banco});
    } catch (err) {
        next(err)
    }
};

export const getBancos = async (req: express.Request, res: express.Response, next) => {
    try {
        const bancos = await prisma.banco.findMany();
        res.status(200).json({bancos});
    } catch (err) {
        next(err)
    }
};

export const createBanco = async (req: express.Request, res: express.Response, next) => {
    try {
        const banco = await prisma.banco.create({
            data: {
                nombre: req.body.nombre,

            },
        });
        res.status(201).json({banco});
    } catch (err) {
        next(err)
    }
};

export const updateBanco = async (req: express.Request, res: express.Response, next) => {
    const id = parseInt(req.params.id);
    try {
        const banco = await prisma.banco.update({
            where: {
                id: id,
            },
            data: {
                nombre: req.body.nombre || undefined,
            },
        });
        res.status(200).json({banco});
    } catch (err) {
        next(err)
    }
};

export const deleteBanco = async (req: express.Request, res: express.Response, next) => {
    const id = parseInt(req.params.id);
    try {
        const banco = await prisma.banco.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json({banco});
    } catch (err) {
        next(err)
    }
};

