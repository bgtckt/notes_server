import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';

const app = express();

// если в системных переменных определен PORT, то используем его
// иначе берем значение порта из default.json папки config
const PORT = process.env.PORT || config.get('serverPort');
const URL = config.get('dbUrl');

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.status(200).json('Сервер запущен!');
});

async function startApp() {
  try {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();