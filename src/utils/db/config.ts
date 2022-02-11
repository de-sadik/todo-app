import { Dialect, Sequelize } from "sequelize";
import config from "config";

const dbName = config.get<string>("dbName");
const dbHost = config.get<string>("dbHost");
const dbPassword = config.get<string>("dbPassword");
const dbUser = config.get<string>("dbUser");
const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  dialectOptions:{
    useUTC: true
  },
  timezone: '+02.00',
  logging: false,
});

export default sequelizeConnection;
