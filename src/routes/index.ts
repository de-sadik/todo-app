import { Express, Request, Response } from "express";
import { createTodo, getTodos,getTodo, updateTodo, deleteTodo } from "../controller/todo.controller";
import validate from "../middleware/validateResoures";
import { createTodoSchema, getTodosSchema, oneTodoSchema, updateTodoSchema } from "../schema/todo.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  
  app.get("/todo/:area/:location",validate(getTodosSchema),getTodos);
  app.get("/todo/",getTodos);
  app.post("/todo", validate(createTodoSchema),createTodo);
  app.get("/todo/:todoId",validate(oneTodoSchema),getTodo)
  app.put("/todo/:todoId",validate(updateTodoSchema),updateTodo)
  app.delete("/todo/:todoId",validate(oneTodoSchema),deleteTodo)
}

export default routes;
