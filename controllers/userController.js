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
        return res.status(400).json({message: 'Некорректный запрос', errors})
      }
      // получаем email и пароль из тела запроса
      const {email, password} = req.body;
      // получаем результат запроса на регистрацию из соответствующего метода класса userService
      const regResult = await userService.registration(email, password);

      if (regResult.isExists) {
        return res.status(400).json({message: `Пользователь с email ${email} уже существует`});
      } else {
        // сохраняем пользователя в БД
        await regResult.user.save();
        // возвращаем ответ от сервера
        return res.json({message: 'Вы успешно зарегистрировались!'});
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
        return res.status(404).json({message: `Пользователь не найден`});
      }
      if (loginResult.errors.invalidPass) {
        return res.status(404).json({message: `Неверный пароль`});
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
      const authResult = await userService.auth(req.user.id);
      
      return res.json(authResult);
    } catch (error) {
      console.log(error);
      res.send({message: 'Server error'});
    }
  }
}

export default new userController();