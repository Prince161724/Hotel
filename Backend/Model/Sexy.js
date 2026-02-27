import express from 'express';
import controller from './controller.js';
import auth from './auth.js';
import validator from './validator.js';

const router = express.Router();

router.get('/users', auth, controller.getUsers);
router.post('/users', validator, controller.createUser);
router.put('/users/:id', auth, controller.updateUser);
router.delete('/users/:id', auth, controller.deleteUser);

export default router;
//Just For Trign 2
