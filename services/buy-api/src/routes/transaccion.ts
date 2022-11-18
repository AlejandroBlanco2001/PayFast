import {Router } from 'express';
import {createTransaccion, getTransaccionbyUser, getTransacciones} from '../controllers/transaccion';
import { verifyTransaccion, verifyAdmin, verifyUser } from '../utils/jwt';

const router = Router();

router.post('/', verifyTransaccion, createTransaccion);
<<<<<<< HEAD
router.get('/user/:userid', verifyUser, getTransaccionbyUser);
=======
router.get('/user/:id', verifyUser, getTransaccionbyUser);
>>>>>>> 31726e504fcdb47945ae517d795ca5db4d5351f2
router.get('/', verifyAdmin, getTransacciones);

export default router;