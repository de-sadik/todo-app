import Todo from "../../models/todo.model";

const dbInit = () => Promise.all([Todo.sync({ alter: true })]);

export default dbInit;
