import Router from "express";
import noteController from "../controllers/noteController.js";
import authMiddleWare from "../middleware/auth.middleware.js";

const notesRouter = new Router();

// end-point для POST-запроса на создание новой заметки
notesRouter.post('', authMiddleWare, noteController.create);
// end-point для GET-запроса на получение всех заметок пользователя
notesRouter.get('', authMiddleWare, noteController.get);
// end-point для DELETE-запроса на удаление заметки по id
notesRouter.delete('/:id', authMiddleWare, noteController.delete);

export default notesRouter;