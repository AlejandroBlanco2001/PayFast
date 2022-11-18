import {Router } from 'express';
import {createTransaccion, getTransaccionbyUser, getTransacciones} from '../controllers/transaccion';
import { verifyTransaccion, verifyAdmin } from '../utils/jwt';

const router = Router();

router.post('/', verifyTransaccion, createTransaccion);
router.get('/user/:id', verifyTransaccion, getTransaccionbyUser);
router.get('/', verifyAdmin, getTransacciones);

export default router;