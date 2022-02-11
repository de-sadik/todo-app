import { TodoOutput } from "../models/todo.model";
import moment from "moment";
import 'moment-timezone';

export async function convertDueDate(timezone:string ,data:TodoOutput[]):Promise<TodoOutput[]>{
    return data.map((todo)=>{
        todo.dueDate = moment.tz(todo.dueDate,timezone).toDate()
        todo.dueTime = moment.tz(todo.dueDate,timezone).format('LT')
        return todo
    })
}