import { boolean, date, number, object, string, TypeOf } from "zod";
import moment from "moment";

const payload = object({
  title: string({
    required_error: `Title required`,
  }),
  description: string({
    required_error: `Description is required`,
  }),
  dueDate: string({
    required_error: `Due date is required`,
  }).refine((data) => true === moment(data, "YYYY-MM-DD", true).isValid(), {
    message: ` Date should be in format YYYY-MM-DD`,
    path: ["dueDate"],
  }),
  dueTime: string({
    required_error: `Due time is required`,
  }).refine((data) => true === moment(data, "H:m:s", true).isValid(), {
    message: ` Time should be in format H:m:s`,
    path: ["dueTime"],
  }),
  timezone: string({
    required_error: `timezone required`,
  }),
}).strict();

const params = object({
  todoId: number({
    required_error: "postId is required",
  }),
});

export const createTodoSchema = object({
  body: payload,
});

export const oneTodoSchema = object({
   params: params,
});

export const getTodosSchema = object({
  params: object({
   area: string().optional(),
   location: string().optional(),
  }).strict(),
})

export const updateTodoSchema = object({
   body: payload.partial(),
   params: params,
})

export type CreateTodo = TypeOf<typeof createTodoSchema>;

export type OneTodoSchema = TypeOf<typeof oneTodoSchema>;

export type GetTodosSchema = TypeOf<typeof getTodosSchema>;

export type UpdateTodoSchema = TypeOf<typeof updateTodoSchema>;