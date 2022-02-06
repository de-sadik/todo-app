import express from "express";
import routes from "./routes/route";

function createServer() {
  const app = express();
  app.use(express.json());
  routes(app);
  return app;
}
export default createServer;
