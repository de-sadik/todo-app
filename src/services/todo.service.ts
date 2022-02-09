import Todo, { TodoCreationAttributes, TodoOutput } from "../models/todo.model";



export default class TodoService {
  constructor (){

  }

  async create (payload: TodoCreationAttributes): Promise<TodoOutput>{
    const todo = await Todo.create(payload);
    return todo;
  };
   
  update = async (id:number,payload: Partial<TodoCreationAttributes>): Promise<TodoOutput> => {
      const  todo =  await Todo.findByPk(id)
      if(!todo){
          throw new Error(`not found`)
      }
      const updatedTodo = await todo.update(payload)
      return updatedTodo;
  }
  getById = async (id:number): Promise<TodoOutput> => {
      const todo = await Todo.findByPk(id)
      if(!todo){
        throw new Error(`not found`)
      }
      return todo;
  }
  deleteById = async (id:number): Promise<boolean> => {
      const deletedTodo = await Todo.destroy({
          where: {id}
      })
      return !!deletedTodo
  }

  getAll = async ():Promise<TodoOutput[]> =>{
      const todos = await Todo.findAll()
      return todos
  }
}

export  {TodoService};