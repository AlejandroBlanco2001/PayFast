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

        //verificar disponibilidad servicio de consulta
        const servicio = await prisma.servicio.findMany({
            where: {
                bancoId: metodo['bancoId'],
                descripcion: 'Consulta',
            }
        });

        if (!servicio[0].estado) {
            return res.status(500).json({message: "Servicio de consulta no disponible"});
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
        const metodos_promises = metodos.map(async metodo => {
            const servicio = await prisma.servicio.findMany({
                where: {
                    bancoId: metodo['bancoId'],
                    descripcion: 'Consulta',
                }
            });
            if (!servicio[0].estado){
                return {
                    id: metodo['id'],
                    nombre: metodo['nombre'],
                    bancoId: metodo['bancoId'],
                    descripcion: 'Servicio consulta no disponible',
                };
            }else{
                return metodo;
            }
        });
        const metodos_disponibles = await Promise.all(metodos_promises);
        res.status(200).json({metodos_disponibles});
    } catch (err) {
        next(err)
    }
};

export const createMetodo = async (req: express.Request, res: express.Response, next) => {
    try {
        console.log(req.body)
        console.log(req['user'].id)
        const metodo = await prisma.metodopago.create({
            data: {
                nombre: req.body.nombre,
                // saldo: +req.body.saldo || undefined,
                user: {
                    connect: {
                        id: parseInt(req['user'].id),
                    },
                },
                banco: {
                    connect: {
                        id: parseInt(req.body.bancoId),
                    }
                },
                CVC: req.body.CVC,
                tipo: req.body.tipo,
                numero: req.body.numero,
            },
        });
        res.status(201).json({metodo});
    } catch (err) {
        console.error(err);
        
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
                numero: req.body.numero || undefined,
                CVC: req.body.cvc || undefined,
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