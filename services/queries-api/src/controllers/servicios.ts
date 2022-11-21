//Obtener servicios
//Servicios disponibles

import express from 'express';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const getServicios = async (req: express.Request, res: express.Response, next) => {
    try {
        const servicios = await prisma.servicio.findMany();
        res.status(200).json({servicios});
    } catch (err) {
        next(err)
    }
};

export const getServicio = async (req: express.Request, res: express.Response, next) => {
    const id = parseInt(req.params.id);
    try {
        const servicio = await prisma.servicio.findUnique({
            where: {
                id: id,
            },
        });
        if (!servicio) {
            return res.status(404).json({message: "Servicio not found"});
        }
        res.status(200).json({servicio});
    } catch (err) {
        next(err)
    }
};

export const getServicioBanco = async (req: express.Request, res: express.Response, next) => {
    const id = parseInt(req.params.bancoid);
    try {
        const servicio = await prisma.servicio.findMany({
            where: {
                bancoId: id,
            },
        });
        if (!servicio) {
            return res.status(404).json({message: "Servicio not found"});
        }
        res.status(200).json({servicio});
    } catch (err) {
        next(err);
    }
};

export const createServicio = async (req: express.Request, res: express.Response, next) => {
    try {
        const servicio = await prisma.servicio.create({
            data: {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                bancoId: req.body.bancoId,
                estado: req.body.estado || undefined,
            },
        });
        res.status(201).json({servicio});
    } catch (err) {
        next(err)
    }
};

export const updateServicio = async (req: express.Request, res: express.Response, next) => {
    const id = parseInt(req.params.id);
    try {
        const servicio = await prisma.servicio.update({
            where: {
                id: id,
            },
            data: {
                nombre: req.body.nombre || undefined,
                descripcion: req.body.descripcion || undefined,
                bancoId: req.body.bancoId || undefined,
                estado: req.body.estado || undefined,
            },
        });
        res.status(200).json({servicio});
    } catch (err) {
        next(err)
    }
};

export const deleteServicio = async (req: express.Request, res: express.Response, next) => {
    const id = parseInt(req.params.id);
    try {
        const servicio = await prisma.servicio.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json({servicio});
    } catch (err) {
        next(err)
    }
};