import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTransaccion = async (req: express.Request, res: express.Response, next) => {
    if(req.body.monto <= 0) {
        return res.status(400).json({message: "Monto must be greater than 0"});
    }
    
    try{
        //verificar estado de metodo de pago
        const metodo = await prisma.metodo.findUnique({
            where: {
                id: req.body.metodoId,
            },
        });
        if (!metodo.estado) {
            return res.status(404).json({message: "Metodo not available"});
        }

        //verificar estado de servicio de transaccion
        const servicio = await prisma.servicio.findUnique({
            where: {
                bancoId: metodo.bancoId,
                descripcion: 'Transferencia',
            }
        });
        if (!servicio.estado){
            return res.status(404).json({message: "Servicio not available"});
        }

        //verificar saldo
        let estado = 'Aprobado';
        if(metodo.saldo < req.body.monto){
            estado = 'Rechazado';
        }

        const transaccion = await prisma.transaccion.create({
            data: {
                id: req.body.id,
                fecha: req.body.fecha,
                monto: req.body.monto,
                sede: req.body.sede,
                franquicia: req.body.franquicia,
                nroCuotas: req.body.nroCuotas,
                userId: req.body.userId,
                metodoId: req.body.metodoId,
                estado: estado
            },
        });
        res.status(201).json({transaccion});
    } catch (err) {
        next(err)
    }
};
