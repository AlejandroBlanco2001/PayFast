import {Router} from 'express';
import {updateUser, deleteUser, getUser, getUsers} from '../controllers/users';
import { verifyAdmin, verifyUser } from '../utils/jwt';
const router = Router();

//CRUD operations
router.get('/', verifyAdmin,getUsers);
router.get('/:username', verifyUser,getUser);
router.put('/:id', verifyUser,updateUser);
router.delete('/:id', verifyUser,deleteUser);

export default router;