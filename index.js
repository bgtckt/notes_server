import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import notesRouter from './routes/notes.routes.js';

const app = express();

// если в системных переменных определен PORT, то используем его
// иначе берем значение порта из default.json папки config
const PORT = process.env.PORT || config.get('serverPort');
const URL = config.get('dbUrl');

// регистрируем корректный парсинг .json
app.use(express.json());
// регистрируем библиотеку для обхода CORS-policy
app.use(cors());
// регистрируем роутеры
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

app.get('/', (req, res) => {
  res.status(200).json('Сервер запущен!');
});

async function startApp() {
  try {
    // подключение к БД и запуск приложения
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();