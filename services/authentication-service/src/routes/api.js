import express from "express";
import welcomeController from "../controllers/welcome-controller.js";
import registerController from "../controllers/register-controller.js";
import loginController from "../controllers/login-controller.js";
import meController from "../controllers/me-controller.js";
import jwtMiddleware from "../middlewares/jwt-middleware.js";
import logoutController from "../controllers/logout-controller.js";
import refreshTokenController from "../controllers/refresh-token-controller.js";
import requestPasswordController from "../controllers/request-password-controller.js";
import verifyNewPasswordController from "../controllers/verify-new-password-controller.js";

const apiRouter = express.Router();

apiRouter.get('/', welcomeController.welcome);

apiRouter.post('/auth/register', registerController.register);
apiRouter.post('/auth/login', loginController.login);
apiRouter.post('/auth/logout', jwtMiddleware.parser(), logoutController.logout);
apiRouter.post('/auth/refresh-token', refreshTokenController.refreshToken);
apiRouter.get('/auth/me', jwtMiddleware.parser(), meController.me);

apiRouter.post('/auth/forgot-password/request', requestPasswordController.requestPassword);
apiRouter.post('/auth/forgot-password/verify', verifyNewPasswordController.verify);

export default apiRouter;