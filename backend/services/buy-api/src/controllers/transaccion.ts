import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

enum Estado {
    Aprobado = 'Aprobado',
    Rechazado = 'Rechazado',
}

export const createTransaccion = async (req: express.Request, res: express.Response, next:express.NextFunction) => {
    //Monto mayor a 0
    if(req.body.monto <= 0) {
        return res.status(400).json({message: "Monto must be greater than 0"});
    }

    //Verificar el estado del método de pago
    let estado = Estado.Aprobado;
    try{
        //verificar estado de metodo de pago
        const metodo = await prisma.metodopago.findUnique({
            where: {
                id: req.body.metodoId,
            },
        });
        if (!metodo.estado) {
            estado = Estado.Rechazado;
        }

        //verificar estado de servicio de transaccion
        const servicio = await prisma.servicio.findMany({
            where: {
                bancoId: metodo['bancoId'],
                descripcion: 'Transferencia',
            }
        });
        if (!servicio[0].estado){
            return res.status(404).json({message: "Servicio Transferencia not available"});
        }

        //verificar saldo
        if(metodo.saldo < req.body.monto){
            estado = Estado.Rechazado;
        }

        const transaccion = await prisma.transaccion.create({
            data: {
                monto: req.body.monto,
                sede: req.body.sede,
                franquicia: req.body.franquicia,
                nroCuotas: req.body.nroCuotas,
                userId: req.body.userid,
                metodoId: req.body.metodoId,
                estado: estado
            },
        });

        if(estado === Estado.Aprobado){
            //actualizar saldo
            const saldo = metodo.saldo - req.body.monto;
            await prisma.metodopago.update({
                where: {
                    id: req.body.metodoId,
                },
                data: {
                    saldo: saldo,
                },
            });
        }
        res.status(201).json({transaccion});
    } catch (err) {
        next(err)
    }
};

export const getTransaccionbyUser = async (req: express.Request, res: express.Response, next:express.NextFunction) => {
    const id: number = +req.params.id || +req.body.id || +req.query.id;
    try {
        const transacciones = await prisma.transaccion.findMany({
            where: {
                userId: id,
            },
        });
        res.status(200).json({transacciones});
    } catch (err) {
        next(err)
    }
};

export const getTransacciones = async (req: express.Request, res: express.Response, next:express.NextFunction) => {
    try {
        const transacciones = await prisma.transaccion.findMany();
        res.status(200).json({transacciones});
    } catch (err) {
        next(err)
    }
};
