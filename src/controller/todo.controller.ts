import { Request, Response } from "express";
import { CreateTodo, OneTodoSchema, UpdateTodoSchema } from "../schema/todo.schema";
import TodoService from "../services/todo.service";
import _ from "lodash";
import moment from "moment";
import 'moment-timezone'


export async function getTodo(req: Request<OneTodoSchema['params']>, res: Response) {
  const todoService = new TodoService()
  const id = Number(req.params.todoId)
   try{
    const todo = await  todoService.getById(id)
    res.send(todo);
  }catch (e) {
    res.status(400).end();
  }
}

export async function createTodo(
  req: Request<{}, {}, CreateTodo["body"]>,
  res: Response
) {
  const payload = {
      ...req.body,
      dueDate: moment.utc(req.body.dueDate+ " "+req.body.dueTime).toDate(),
      dueTime: moment(req.body.dueTime,"HH:mm:ss").format("LT"),
  }
  try {
    const todoService: TodoService = new TodoService();
    const todo = await todoService.create(payload);
    return res.send(todo);
  } catch (e) {
    res.status(400).end();
  }
}

export async function getTodos(req: Request, res: Response) {
    const todoService:TodoService = new TodoService()
    try {
        const todos = await todoService.getAll()
        return res.send(todos)
    }
    catch(e){
        res.status(400).end()
    }
}
export async function updateTodo(req: Request<UpdateTodoSchema['params']>, res: Response) {
  const id = Number(req.params.todoId)
  const todoService = new TodoService()
  try{
    const todo = todoService.update(id,req.body)
    res.status(201).send(todo)
  }
  catch(e){
    res.status(400)
  }
}

export async function deleteTodo(req: Request<OneTodoSchema['params']>, res: Response) {
  const id = Number(req.params.todoId)
  const todoService = new TodoService()
  const result = await todoService.deleteById(id)
  res.status(203).send({
    sucess: result
  })
}