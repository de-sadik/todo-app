import { Express, Request, Response } from "express";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.get("/todo/")
  app.post("/todo/:timezone")
}

export default routes;
