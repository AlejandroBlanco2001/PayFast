import {Router} from 'express';
import {getServicios, getServicio, getServicioBanco, createServicio, updateServicio, deleteServicio} from '../controllers/servicios';

const router = Router();

router.get('/', getServicios);
router.get('/:id', getServicio);
router.get('/banco/:bancoid', getServicioBanco)
router.post('/', createServicio);
router.put('/:id', updateServicio);
router.delete('/:id', deleteServicio);

export default router;