import { Request, Response } from "express";
import { CreateTodo, GetTodosSchema, OneTodoSchema, UpdateTodoSchema } from "../schema/todo.schema";
import TodoService from "../services/todo.service";
import _ from "lodash";
import moment from "moment";
import 'moment-timezone';
import { convertDueDate } from "../utils/todo";
import WorldTimeAPI from "../utils/currentTime";

export async function getTodo(req: Request<OneTodoSchema['params']>, res: Response) {
  const todoService = new TodoService()
  const id = Number(req.params.todoId)
   try{
    const todo = await  todoService.getById(id)
    res.send(todo);
  }catch (e) {
    res.status(400).send({id:`${id} not found`}).end();
  }
}

export async function createTodo(
  req: Request<{}, {}, CreateTodo["body"]>,
  res: Response
) {
  const payload = {
      ...req.body,
      dueDate: moment.utc(new Date(req.body.dueDate+ " "+req.body.dueTime),'YYYY-MM-DD H:m:s').toDate(),
      dueTime: moment(req.body.dueTime,"HH:mm:ss").format("LT"),
  }
  try {
    const todoService: TodoService = new TodoService();
    const todo = await todoService.create(payload);
    return res.status(201).send(todo);
  } catch (e) {
    res.status(400).end();
  }
}

export async function getTodos(req: Request<GetTodosSchema['params']>, res: Response) {
    const todoService:TodoService = new TodoService()
    try { 
        
        if (req.params.area && req.params.location){
        const wordTimeAPI = new WorldTimeAPI() 
        const currentTime = await wordTimeAPI.timeNow(`${req.params.area}/${req.params.location}`)  
        let todos = await todoService.getAll(currentTime)
        // console.log(``)
        todos = await convertDueDate(`${req.params.area}/${req.params.location}`,todos)
        return res.send(todos)
        }
        let todos = await todoService.getAll()
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
    const todo = await todoService.update(id,req.body)
    res.status(200).send(todo)
  }
  catch(e){
    res.status(400).end()
  }
}

export async function deleteTodo(req: Request<OneTodoSchema['params']>, res: Response) {
  const id = Number(req.params.todoId)
  const todoService = new TodoService()
  const result = await todoService.deleteById(id)
  res.status(200).send({
    sucess: result
  })
}