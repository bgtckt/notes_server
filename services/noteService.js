import Note from '../models/Note.js';

// класс-Service для реализации бизнес-логики при работе с заметками
class noteService {

  async create(note, id) {
    try {
      // вносим в поле user идентификатор пользователя, который создал заметку
      // id получаем из декодированного токена из authMiddleware
      note.user = id;
      // создаем новый объект-заметку
      const newNote = await Note.create(note);
      return newNote;
    } catch (error) {
      console.log(error);
      res.send({message: 'Server error'});
    }
  }

  async get(id) {
    // получаем все заметки, относящиеся к авторизованному пользователю
    try {
      const notes = await Note.find({user: id});
      return notes;
    } catch (error) {
      console.log(error);
      res.send({message: 'Server error'});
    }
  }

  async delete(id) {
    // проверяем наличие заметки в БД
    if (!id) {
        throw new Error('ID не указан');
    }
    // удаляем заметку из БД по id
    const note = await Note.findByIdAndDelete(id);
    return note;
  }
}

export default new noteService();