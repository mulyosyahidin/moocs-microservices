import express from "express";
import welcomeController from "../controllers/welcome-controller.js";

const apiRouter = express.Router();

apiRouter.get('/', welcomeController.welcome);

export default apiRouter;