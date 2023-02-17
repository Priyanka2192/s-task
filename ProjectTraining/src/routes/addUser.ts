import express from "express";
const router = express.Router();
import addUserController from '../controllers/addUserController';

router.route(`/`).post(addUserController.addUser);

module.exports = router;