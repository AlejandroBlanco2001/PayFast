import {Router} from 'express';
import {getMetodosUsuario, getMetodo, createMetodo, updateMetodo, deleteMetodo} from '../controllers/metodos';
import {verifyUser, verifyUserMetodo} from '../utils/jwt';

const router = Router();

router.get('/user/', verifyUser,getMetodosUsuario);
router.get('/:id', verifyUserMetodo,getMetodo);
router.post('/', verifyUser,createMetodo);
router.put('/:id', verifyUserMetodo,updateMetodo);
router.delete('/:id', verifyUserMetodo,deleteMetodo);

export default router;