import Router from "express";
import { check } from "express-validator";
import userController from "../controllers/userController.js";
import authMiddleWare from "../middleware/auth.middleware.js";

const authRouter = new Router();

// POST-запрос на регистрацию пользователя по URL = "/registration"
authRouter.post('/registration', [
  // валидация полученных данных
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Password must be longer than 8').isLength({min: 8})
], userController.registration);

// POST-запрос на авторизацию пользователя по URL = "/login"
authRouter.post('/login', userController.login);

// GET-запрос, позволяющий ранее авторизованному пользователю оставаться в системе при перезагрузке приложения
authRouter.get('/auth', authMiddleWare, userController.auth);

export default authRouter;