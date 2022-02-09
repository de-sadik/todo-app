import config from "config";
import createServer from "./server";
import dbInit from "./utils/db/init";
dbInit()

const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
  console.log(`server started on port ${port}`);
});
