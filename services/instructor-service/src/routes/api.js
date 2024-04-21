import express from "express";
import welcomeController from "../controllers/welcome-controller.js";
import registerController from "../controllers/register-controller.js";
import jwtMiddleware from "../middlewares/jwt-middleware.js";
import instructorController from "../controllers/instructor-controller.js";
import fileUploader from "../utils/file-uploader.js";

const apiRouter = express.Router();

apiRouter.get('/', welcomeController.welcome);

apiRouter.post('/register', registerController.register);
apiRouter.get('/instructors', jwtMiddleware.parser(['admin']), instructorController.index);
apiRouter.get('/instructors/:id', jwtMiddleware.parser(['admin', 'instructor']), instructorController.show);
apiRouter.put('/instructors/:id', fileUploader.single('picture'), jwtMiddleware.parser(['admin', 'instructor']), instructorController.update);
apiRouter.put('/instructors/:id/approve', jwtMiddleware.parser(['admin']), instructorController.approve);
apiRouter.put('/instructors/:id/reject', jwtMiddleware.parser(['admin']), instructorController.reject);
apiRouter.put('/instructors/:id/ban', jwtMiddleware.parser(['admin']), instructorController.ban);
apiRouter.delete('/instructors/:id', jwtMiddleware.parser(['admin']), instructorController.destroy);

export default apiRouter;