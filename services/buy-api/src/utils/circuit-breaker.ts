import { PrismaClient } from "@prisma/client";

enum Estado {
    Aprobado = 'Aprobado',
    Rechazado = 'Rechazado',
}


export const cb = async () => {
    const prisma = new PrismaClient();
    const transacciones = await prisma.cbtransaccion.findMany();
    console.log(transacciones);
    transacciones.forEach(async (cbtransaccion) => {
        if(cbtransaccion.monto <= 0) {
            await prisma.cbtransaccion.delete({
                where: {
                    id: cbtransaccion.id,
                },
            });
            return;
        }
        let message = "succesful"
        //Verificar el estado del método de pago
        let estado = Estado.Aprobado;
        try{
            //verificar estado de metodo de pago
            const metodo = await prisma.metodopago.findUnique({
                where: {
                    id: cbtransaccion.metodoId,
                },
            });
            if (!metodo.estado) {
                estado = Estado.Rechazado;
                message="Payment Method not active"
            }
    
            //verificar estado de servicio de transaccion
            const servicio = await prisma.servicio.findMany({
                where: {
                    bancoId: metodo['bancoId'],
                    descripcion: 'Transferencia',
                }
            });
            if (!servicio[0].estado){
                await prisma.cbtransaccion.delete({
                    where: {
                        id: cbtransaccion.id,
                    },
                });
                return;
            }
    
            //verificar saldo
            if(metodo.saldo < cbtransaccion.monto){
                estado = Estado.Rechazado;
                message = "insufficient balance"
            }
    
            const transaccion = await prisma.transaccion.create({
                data: {
                    monto: cbtransaccion.monto,
                    sede: cbtransaccion.sede,
                    franquicia: cbtransaccion.franquicia,
                    nroCuotas: cbtransaccion.nroCuotas,
                    userId: cbtransaccion.userId,
                    metodoId: cbtransaccion.metodoId,
                    estado: estado
                },
            });
    
            if(estado === Estado.Aprobado){
                //actualizar saldo
                const saldo = metodo.saldo - cbtransaccion.monto;
                await prisma.metodopago.update({
                    where: {
                        id: cbtransaccion.metodoId,
                    },
                    data: {
                        saldo: saldo,
                    },
                });
            }
            await prisma.cbtransaccion.delete({
                where: {
                    id: cbtransaccion.id,
                },
            });
        } catch (err) {
            console.log(err);
        }
    });
}
