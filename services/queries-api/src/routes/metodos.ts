import {Router} from 'express';
import {getMetodosUsuario, getMetodo, createMetodo, updateMetodo, deleteMetodo} from '../controllers/metodos';
import {verifyUser, verifyUserMetodo} from '../utils/jwt';

const router = Router();

router.get('/:userid', verifyUser,getMetodosUsuario);
router.get('/:id', verifyUserMetodo,getMetodo);
router.post('/', createMetodo);
router.put('/:id', verifyUserMetodo,updateMetodo);
router.delete('/:id', verifyUserMetodo,deleteMetodo);

export default router;