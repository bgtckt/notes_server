import mongoose from 'mongoose';

const User = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  // связываем сущность User с сущностью File
  // files - массив с объектами типа ObjectId, который ссылается на сущность File
  notes: [{type: mongoose.ObjectId, ref: 'Note'}]
});

export default mongoose.model('User', User);