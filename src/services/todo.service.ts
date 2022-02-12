import moment from "moment";
import { where , Op} from "sequelize";
import Todo, { TodoCreationAttributes, TodoOutput } from "../models/todo.model";



export default class TodoService {
  constructor (){

  }

  async create (payload: TodoCreationAttributes): Promise<TodoOutput>{
    const todo = await Todo.create(payload);
    return todo;
  };
   
  async update (id:number,payload: Partial<TodoCreationAttributes>): Promise<TodoOutput> {
      const  todo =  await Todo.findByPk(id)
      if(!todo){
          throw new Error(`not found`)
      }
      const updatedTodo = await todo.update(payload)
      return updatedTodo;
  }
  async getById (id:number): Promise<TodoOutput> {
      const todo = await Todo.findByPk(id)
      if(!todo){
        throw new Error(`not found`)
      }
      return todo;
  }
  async deleteById(id:number): Promise<boolean> {
      const deletedTodo = await Todo.destroy({
          where: {id}
      })
      return !!deletedTodo
  }

  async getAll (time?:string):Promise<TodoOutput[]>{
      if(time){
      const todo = await Todo.findAll({
        where:{
          dueDate:{
            [Op.gt]: time,
          } 
        }
      })
      return todo;
      }
      else{
      const todos = await Todo.findAll({
        where:{
          dueDate:{
            [Op.gt]: moment.utc(new Date()).toDate(),
          } 
        }
      })
      return todos
      }

      
  }
}

export  {TodoService};