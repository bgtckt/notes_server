import { validationResult } from "express-validator";
import userService from "../services/userService.js";

// кастомный класс-Controller, содержащий CRUD для работы с пользователями
class userController {

  async registration(req, res) {
    try {
      // проверка на наличие ошибок валидации
      const errors = validationResult(req);
      // если результат валидации содержит ошибки, возвращаем сообщение об ошибке
      if(!errors.isEmpty()) {
        return res.status(400).json({message: 'Incorrect request', errors})
      }
      // получаем email и пароль из тела запроса
      const {email, password} = req.body;
      // получаем результат запроса на регистрацию из соответствующего метода класса userService
      const regResult = await userService.registration(email, password);

      if (regResult.isExists) {
        return res.status(400).json({message: `User with email ${email} already exists`});
      } else {
        // сохраняем пользователя в БД
        await regResult.user.save();
        // возвращаем ответ от сервера
        return res.json({message: 'User was created'});
      }
    } catch (error) {
      // вывод сообщения пользователю в случае ошибки
      res.send({message: 'Server error'});
    }
  }

  async login(req, res) {
    try {
      const {email, password} = req.body;
      // получаем результат запроса на авторизацию из соответствующего метода класса userService
      const loginResult = await userService.login(email, password);

      // если результат запроса содержит ошибки - вовзращаем сообщение пользователю
      if (loginResult.errors.userNotFound) {
        return res.status(404).json({message: `User not found`});
      }
      if (loginResult.errors.invalidPass) {
        return res.status(404).json({message: `Invalid password`});
      }

      return res.json(loginResult.user);
    } catch (error) {
      console.log(error);
      res.send({message: 'Server error'});
    }
  }

  async auth (req, res) {
    try {
      // получаем результат запроса на авторизацию
      const authResult = userService.auth(req.user.id); 
      
      return res.json(authResult.user);
    } catch (error) {
      console.log(error);
      res.send({message: 'Server error'});
    }
  }
}

export default new userController();