import createServer from "../server";
import supertest from "supertest";
import Todo, { TodoAttributes } from "../models/todo.model";
import moment from "moment";
import * as _ from "lodash";
import { apiResponse } from "../utils/__test__/currentTime.test";
import WorldTimeAPI from "../utils/currentTime";

const app = createServer();

const payload = {
  title: "Project",
  description: "complete the project before due date",
  dueDate: "2022-02-11",
  dueTime: "18:50:0",
  timezone: "Asia/Kolkata",
};
const retunValue: TodoAttributes = {
  id: 17,
  title: "Project",
  description: "complete the project before due date",
  dueDate: moment("2022-02-11T13:20:00.000Z").toDate(),
  dueTime: "6:50 PM",
  timezone: "Asia/Kolkata",
  updatedAt: moment("2022-02-11T09:21:27.335Z").toDate(),
  createdAt: moment("2022-02-11T09:21:27.335Z").toDate(),
};

let todoInstance: Todo;
beforeAll(() => {
  todoInstance = new Todo(retunValue);
});

describe("todo api", () => {
  describe(`get todo by id`, () => {
    test(`should return todo and status 200`, async () => {
      const getById = jest
        .spyOn(Todo, "findByPk")
        //@ts-ignore
        .mockReturnValueOnce(todoInstance);

      let response = await supertest(app).get(`/todo/${retunValue.id}`);
      expect(response.statusCode).toBe(200);
      expect(getById).toBeCalledWith(retunValue.id);
      expect(response.body).toEqual(JSON.parse(JSON.stringify(retunValue)));
    });
    test(`given invalid id, should return 400 `, async () => {
      const getById = jest
        .spyOn(Todo, "findByPk")
        //@ts-ignore
        .mockReturnValueOnce(null);

      let response = await supertest(app).get(`/todo/${18}`);
      expect(response.statusCode).toBe(400);
      expect(getById).toBeCalledWith(18);
    });
  });
  describe("create todo", () => {
    describe(`given all request parameter`, () => {
      test("should return todo, 200", async () => {
        const create = jest
          .spyOn(Todo, "create")
          .mockReturnValueOnce(todoInstance);

        let response = await supertest(app).post(`/todo/`).send(payload);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(JSON.parse(JSON.stringify(retunValue)));
        expect(create).toHaveBeenCalled();
      });
    });
    describe(`missing some parameter`, () => {
      test("should return 400", async () => {
        const create = jest
          .spyOn(Todo, "create")
          .mockReturnValueOnce(todoInstance);

        let response = await supertest(app)
          .post(`/todo/`)
          .send(_.omit(payload, ["title", "description"]));

        expect(response.statusCode).toBe(400);
        expect(create).not.toHaveBeenCalled();
      });
    });
  });
  describe(`update todo`, () => {
    describe(`given valid id`, () => {
      test(`should return 201`, async () => {
        const todoFindById = jest
          .spyOn(Todo, "findByPk")
          //@ts-ignore
          .mockReturnValueOnce(todoInstance);

        const update = jest
          .spyOn(todoInstance, "update")
          //@ts-ignore
          .mockReturnValueOnce({ ...retunValue, title: "Test" });

        let response = await supertest(app)
          .put(`/todo/${retunValue.id}`)
          .send({ title: "Test" });

        expect(response.statusCode).toBe(200);
        expect(update).toBeCalledWith({ title: "Test" });
        expect(response.body).toEqual(
          JSON.parse(JSON.stringify({ ...retunValue, title: "Test" }))
        );
      });
    });
    describe(`given Ivalid id`, () => {
      test(`should return 2`, async () => {
        const todoFindById = jest
          .spyOn(Todo, "findByPk")
          //@ts-ignore
          .mockReturnValueOnce(null);

        let response = await supertest(app)
          .put(`/todo/18`)
          .send({ title: "Test" });
        expect(response.statusCode).toBe(400);
      });
    });
  });

  describe(`delete todo`, () => {
    describe(`given valid id `, () => {
      test(`should return 200`, async () => {
        const deleteTodo = jest
          .spyOn(Todo, "destroy")
          //@ts-ignore
          .mockReturnValueOnce(1);
        let response = await supertest(app).delete(`/todo/${retunValue.id}`);

        expect(response.statusCode).toBe(200);
      });
    });
    describe(`given invalid id `, () => {
      test(`should return false`, async () => {
        const deleteTodo = jest
          .spyOn(Todo, "destroy")
          //@ts-ignore
          .mockReturnValueOnce(0);
        let response = await supertest(app).delete(`/todo/19`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ sucess: false });
      });
    });
  });

  describe(`get all todos`, () => {
    describe("not given path param", () => {
      test(`should return in utc time zone ,status code 200`, async () => {
        const findAll = jest
          .spyOn(Todo, "findAll")
          //@ts-ignore
          .mockReturnValueOnce([todoInstance]);

        let response = await supertest(app).get("/todo/");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([JSON.parse(JSON.stringify(retunValue))]);
      });
    });
    describe("given time zone as path param", () => {
      test(`should return in time zone ,status code 200`, async () => {
        const findAll = jest
          .spyOn(Todo, "findAll")
          //@ts-ignore
          .mockReturnValueOnce([todoInstance]);

        const timezone = "Asia/Kolkata";
        const getTimeSpy = jest
          .spyOn(WorldTimeAPI.prototype, "getTime")
          //@ts-ignore
          .mockReturnValueOnce(apiResponse);

        const expectedResponse = {
          ...retunValue,
          dueDate: moment.tz(retunValue.dueDate, timezone).toDate(),
          dueTime: moment.tz(retunValue.dueDate, timezone).format("LT"),
        };

        let response = await supertest(app).get(`/todo/${timezone}`);
        expect(response.statusCode).toBe(200);
        expect(getTimeSpy).toHaveBeenCalled();
        expect(findAll).toHaveBeenCalled();
        expect(response.body).toEqual([
          JSON.parse(JSON.stringify(expectedResponse)),
        ]);
      });
    });
  });
});
