import {Router} from 'express';
import {getBancos, getBanco, createBanco, updateBanco, deleteBanco} from '../controllers/bancos';
import {verifyAdmin} from '../utils/jwt';

const router = Router();

router.get('/', getBancos);
router.get('/:id', getBanco);
router.post('/', verifyAdmin,createBanco);
router.put('/:id', verifyAdmin,updateBanco);
router.delete('/:id', verifyAdmin,deleteBanco);

export default router;