import {Router } from 'express';
import {createTransaccion} from '../controllers/transaccion';
import { verifyTransaccion } from '../utils/jwt';

const router = Router();

router.post('/', verifyTransaccion, createTransaccion);

export default router;