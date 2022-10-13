import express from 'express';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const getMetodo = async (req: express.Request, res: express.Response, next) => {
    const id = parseInt(req.params.id);
    try {
        const metodo = await prisma.metodopago.findUnique({
            where: {
                id: id,
            },
        });
        if (!metodo) {
            return res.status(404).json({message: "Metodo not found"});
        }
        res.status(200).json({metodo});
    } catch (err) {
        next(err)
    }
};

export const getMetodosUsuario = async (req: express.Request, res: express.Response, next) => {
    //verificar disponibilidad de servicio de consulta
    const id = parseInt(req['user'].id);
    try {
        const metodos = await prisma.metodopago.findMany({
            where: {
                userId: id,
            },
        });
        res.status(200).json({metodos});
    } catch (err) {
        next(err)
    }
};

export const createMetodo = async (req: express.Request, res: express.Response, next) => {
    try {
        const metodo = await prisma.metodopago.create({
            data: {
                nombre: req.body.nombre,
                saldo: req.body.saldo || undefined,
                userId: req['user'].id,
                bancoId: req.body.bancoId,
                tipo: req.body.tipo,
            },
        });
        res.status(201).json({metodo});
    } catch (err) {
        next(err)
    }
};

export const updateMetodo = async (req: express.Request, res: express.Response, next) => {
    const id = parseInt(req.params.id);
    try {
        const metodo = await prisma.metodopago.update({
            where: {
                id: id,
            },
            data: {
                nombre: req.body.nombre || undefined,
                saldo: req.body.saldo || undefined,
                userId: req.body.userId || undefined,
                bancoId: req.body.bancoId || undefined,
                tipo: req.body.tipo || undefined,
            },
        });
        res.status(200).json({metodo});
    } catch (err) {
        next(err)
    }
};

export const deleteMetodo = async (req: express.Request, res: express.Response, next) => {
    const id = parseInt(req.params.id);
    try {
        const metodo = await prisma.metodopago.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json({metodo});
    } catch (err) {
        next(err)
    }
};