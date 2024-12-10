import express from 'express';
import { getUsers, createUser, updateUser, deleteUser, recoverPassword } from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);
router.post('/add', createUser);
router.put('/update:id', updateUser);
router.post('/recover', recoverPassword);
router.delete('/delete:id', deleteUser);

export default router;