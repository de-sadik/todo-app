import moment from "moment";
import { updateTodo } from "src/controller/todo.controller";
import Todo, {
  TodoAttributes,
  TodoCreationAttributes,
  TodoOutput,
} from "../../models/todo.model";
import TodoService from "../todo.service";

const payload: TodoCreationAttributes = {
  title: "Project",
  description: "complete the project before due date",
  dueDate: moment.utc("2022-02-11 18:50:0", "YYYY-MM-DD H:m:s").toDate(),
  dueTime: moment("18:50:0", "HH:mm:ss").format("LT"),
  timezone: "Asia/Kolkata",
};
const retunValue: TodoOutput = {
  id: 17,
  title: "Project",
  description: "complete the project before due date",
  dueDate: moment("2022-02-11T13:20:00.000Z").toDate(),
  dueTime: "6:50 PM",
  timezone: "Asia/Kolkata",
  updatedAt: moment("2022-02-11T09:21:27.335Z").toDate(),
  createdAt: moment("2022-02-11T09:21:27.335Z").toDate(),
};

let todoInstance:Todo
beforeAll(()=>{
    todoInstance = new Todo(retunValue)
})

describe("create todo", () => {
  test("should return todo", async () => {
    const create = jest.spyOn(Todo, "create").mockReturnValueOnce(todoInstance);

    const todoService = new TodoService();
    const todo = await todoService.create(payload);

    expect(todo).toEqual(todoInstance);
    expect(create).toHaveBeenCalledWith(payload);
  });
});
describe('update todo',()=>{
    test('should return updated todo',async ()=>{
        const todoFindById = jest
        .spyOn(Todo,'findByPk')
        //@ts-ignore
        .mockReturnValueOnce(todoInstance)

        const update = jest
        .spyOn(todoInstance,'update')
        //@ts-ignore
        .mockReturnValueOnce({...retunValue,title:'Test 11'})
        
        const todoService = new TodoService()
        const updatedTodo = await todoService.update(retunValue.id,{...payload,title:'Test 11'})
        expect('Test 11').toBe(updatedTodo.title)
        expect(todoFindById).toHaveBeenCalledWith(retunValue.id)
        expect(update).toHaveBeenCalledWith({...payload,title:'Test 11'})

    })
    test(`given invaild id , should throw error`,async ()=>{
        const todoFindById = jest
        .spyOn(Todo,'findByPk')
        //@ts-ignore
        .mockReturnValueOnce(null)

        const update = jest
        .spyOn(todoInstance,'update')
        //@ts-ignore
        .mockReturnValueOnce({...retunValue,title:'Test 11'})
        
        const todoService = new TodoService()
        try{
        const updatedTodo = await todoService.update(18,{...payload,title:'Test 11'})

        }
        catch(e){
            expect(e).toEqual(new Error(`not found`))
        }
        expect(todoFindById).toHaveBeenCalledWith(18)
        expect(update).not.toHaveBeenCalled()

    })
})

describe("get todo by id", () => {
  describe(`given valid id`, () => {
    test("should return todo", async () => {
      const todoFindById = jest
        .spyOn(Todo, "findByPk")
        //@ts-ignore
        .mockReturnValueOnce(todoInstance);

      const todoService = new TodoService();
      const todo = await todoService.getById(retunValue.id);
      expect(todo).toEqual(todoInstance);
      expect(todoFindById).toHaveBeenLastCalledWith(retunValue.id)
    });
  });
  describe(`given invalid id`, () => {
    test(`should throw not found`, async () => {
      const todoFindById = jest
        .spyOn(Todo, "findByPk")
        //@ts-ignore
        .mockReturnValueOnce(null);

      const todoService = new TodoService();
      try {
        const todo = await todoService.getById(retunValue.id);
      } catch (e) {
        expect(e).toEqual(new Error(`not found`));
      }
      expect(todoFindById).toHaveBeenLastCalledWith(retunValue.id)

    });
  });
});

describe(`get all todos`, () => {
  test(`should return array of todos`, async () => {
    const findAll = jest
      .spyOn(Todo, "findAll")
      //@ts-ignore
      .mockReturnValueOnce([retunValue]);

    const todoService = new TodoService();
    const todos = await todoService.getAll();
    expect(todos).toEqual([retunValue]);
    expect(findAll).toHaveBeenCalled()

  });
});

describe(`delete todo`, () => {
  describe(`given valid id`, () => {
    test(`should return true`, async () => {
      const deleteTodo = jest
        .spyOn(Todo, "destroy")
        //@ts-ignore
        .mockReturnValueOnce(1);

      const todoService = new TodoService();
      const todo = await todoService.deleteById(11);
      expect(todo).toBe(true);
      expect(deleteTodo).toHaveBeenCalled()
    });
  });
  describe(`given invalid id`, () => {
    test(`should return false`, async () => {
      const deleteTodo = jest
        .spyOn(Todo, "destroy")
        //@ts-ignore
        .mockReturnValueOnce(0);

      const todoService = new TodoService();
      const todo = await todoService.deleteById(11);
      expect(todo).toBe(false);
      expect(deleteTodo).toHaveBeenCalled()

    });
  });
});
