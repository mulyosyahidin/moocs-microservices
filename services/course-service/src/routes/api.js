import express from "express";
import welcomeController from "../controllers/welcome-controller.js";
import categoryController from "../controllers/category-controller.js";
import fileUploader from "../utils/file-uploader.js";
import jwtMiddleware from "../middlewares/jwt-middleware.js";

const apiRouter = express.Router();

apiRouter.get('/', welcomeController.welcome);
apiRouter.get('/categories', categoryController.index);
apiRouter.post('/categories', fileUploader.single('picture'), jwtMiddleware.parser(['admin']),  categoryController.store);
apiRouter.get('/categories/:id', categoryController.show);
apiRouter.put('/categories/:id', fileUploader.single('picture'), jwtMiddleware.parser(['admin']), categoryController.update);
apiRouter.delete('/categories/:id', jwtMiddleware.parser(['admin']), categoryController.destroy);

export default apiRouter;