import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import config from "config";

// класс для реализации бизнес-логики при работе с пользователями
class userService {

  async registration(email, password) {
    const result = {};
    // находим пользователя в БД по email из запроса
    const candidate = await User.findOne({email});
    // если пользователь уже существует
    if (candidate) {
      result.isExists = true;
    } else {
      // если пользователь новый - создаем нового пользователя user
      // хэшируем пароль и записываем в user
      const hashPassword = await bcryptjs.hash(password, 8);
      result.user = new User({email: email, password: hashPassword});
    }
    return result;
  }

  async login(email, password) {
    const result = {
      errors: {}
    };

    const user = await User.findOne({email});
    // если пользователь не найден - возвращаем ошибку
    if (!user) {
      result.errors.userNotFound = true;
    }

    if(!result.errors.userNotFound) {
      // если пользователь найден, сравниваем пароль из запроса с паролем из БД
      const isPassValid = bcryptjs.compareSync(password, user.password);
      // если пароль не совпадает - сохраняем ошибку
      if (!isPassValid) {
        result.errors.invalidPass = true;
      }
    } 

    if(!result.errors.userNotFound && !result.errors.invalidPass) {
      // создаем токен пользователя
      const token = jsonwebtoken.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'});
      
      // записываем результат авторизации в поле user и возвращаем для дальнейшей обработки
      result.user = {
        token: token,
        user: {
          id: user.id,
          email: user.email,
        }
      };
    }
    return result;
  }

  async auth(id) {
    // получаем пользователя по id, взятому из токена в authMiddleWare (req.user = decoded)
    const user = await User.findOne({_id: id});
    // перезаписываем токен, чтобы обновить срок его действия
    const token = jsonwebtoken.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'});

    return {
      token: token,
      user: {
        id: user.id,
        email: user.email,
      }
    };
  }
}

export default new userService();