import jsonwebtoken from 'jsonwebtoken';
import config from 'config';

// функция-middleware - получает данные о пользователе по токену и возвращает их
function authMiddleWare (req, res, next) {
  // если метод запроса = options, тогда next() вызовет следующий middleware
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    // получаем токен из заголовка запроса Authorization
    const token = req.headers.authorization.split(' ')[1];
    // если токена нет - возвращаем сообщение об ошибке
    if (!token) {
      return res.status(401).json({message: 'Auth error'});
    }
    // получаем данные о пользователе из раскодированного токена
    const decoded = jsonwebtoken.verify(token, config.get('secretKey'));
    // добавляем декодированные данные в запрос, в поле user
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({message: 'Auth error'});
  }
}

export default authMiddleWare;