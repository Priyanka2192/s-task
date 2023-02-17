import express from "express";
const router = express.Router();
import getListController from '../controllers/getListController';

router.route(`/`).get(getListController.getListOfUsers)

module.exports = router;