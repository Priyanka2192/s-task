import express from 'express';
const router = express.Router();
const userController = require('../controllers/userController');
import verifyRoles from '../middleware/verifyRoles';

router.route('/')
    .post(verifyRoles('user_add'), userController.createNewUser)
    .get(verifyRoles('user_get_all'), userController.getAllUsers);

router.route('/:user_id')
    .get(verifyRoles('user_get'), userController.getUserById)
    .put(verifyRoles('user_update'), userController.updateUser)
    .delete(verifyRoles('user_delete'), userController.deleteUser);

module.exports = router;