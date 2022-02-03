import noteService from '../services/noteService.js';

// класс-Controller, содержащий CRUD для работы с заметками
class noteController {

  async create(req, res) {
    try {
      // получаем новую заметку
      const newNote = await noteService.create(req.body, req.user.id);
      // сохраняем новую заметку в БД
      await newNote.save();
      return res.json({message: 'Заметка добавлена'});
    } catch (error) {
      console.log(error);
      res.send({message: 'Server error'});
    }
  }

  async get(req, res) {
    try {
      // получаем все заметки, созданные конкретным пользователем и возвращаем их
      const notes = await noteService.get(req.user.id);
      return res.status(200).json(notes);
    } catch (error) {
      res.send({message: 'Server error'});
    }
  }

  async delete(req, res) {
    try {
      // находим заметку по id из параметров запроса
      const note = await noteService.delete(req.params.id);
      return res.status(200).json(note);
    } catch (error) {
      res.send({message: 'Server error'});
    }
}
}

export default new noteController();