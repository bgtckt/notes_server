import { validationResult } from "express-validator";
import userService from "../services/userService.js";

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

      const regResult = await userService.registration(email, password);

      if (regResult.isExists) {
        return res.status(400).json({message: `User with email ${email} already exists`});
      } else {
        // сохраняем пользователя в БД
        await regResult.user.save();
        // создаем новую директорию для пользователя с именем, соответствующим его id
        // await fileService.createDir(req, new File({user: user.id, name: ''}));
        // возвращаем ответ от сервера
        return res.json({message: 'User was created'});
      }
    } catch (error) {
      // вывод сообщения пользователю в случае ошибки
      res.send({message: 'Server error'})
    }
  }

  async login(req, res) {
    try {
      const {email, password} = req.body;

      const loginResult = await userService.login(email, password);

      if (loginResult.errors.userNotFound) {
        return res.status(404).json({message: `User not found`});
      }

      if (loginResult.errors.invalidPass) {
        return res.status(404).json({message: `Invalid password`});
      }

      return res.json(loginResult.user);
    } catch (error) {
      console.log(error);
      res.send({message: 'Server error'})
    }
  }

  async auth (req, res) {
    try {
      const id = req.user.id;
      const authResult = userService.auth(id); 
      
      return res.json(authResult.user);
    } catch (error) {
      console.log(error);
      res.send({message: 'Server error'})
    }
  }
}

export default new userController();