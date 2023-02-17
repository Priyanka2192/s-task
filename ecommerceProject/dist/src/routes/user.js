"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController = require('../controllers/userController');
const verifyRoles_1 = __importDefault(require("../middleware/verifyRoles"));
router.route('/')
    .post((0, verifyRoles_1.default)('user_add'), userController.createNewUser)
    .get((0, verifyRoles_1.default)('user_get_all'), userController.getAllUsers);
router.route('/:user_id')
    .get((0, verifyRoles_1.default)('user_get'), userController.getUserById)
    .put((0, verifyRoles_1.default)('user_update'), userController.updateUser)
    .delete((0, verifyRoles_1.default)('user_delete'), userController.deleteUser);
module.exports = router;
