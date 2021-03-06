import mongoose from 'mongoose';

// описание модели данных заметки
const Note = new mongoose.Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  date: {type: String, required: true},
  user: {type: mongoose.ObjectId, ref: 'User'},
});

export default mongoose.model('Note', Note);