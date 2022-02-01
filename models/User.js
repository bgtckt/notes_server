import mongoose from 'mongoose';

// описание модели данных пользователя
const User = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  // связываем сущность User с сущностью Note
  // notes - массив с объектами типа ObjectId, который ссылается на сущность Note
  notes: [{type: mongoose.ObjectId, ref: 'Note'}]
});

export default mongoose.model('User', User);