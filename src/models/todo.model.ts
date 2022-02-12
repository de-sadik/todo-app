import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../utils/db/config";

export interface TodoAttributes {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  dueTime: string;
  timezone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoCreationAttributes
  extends Optional<TodoAttributes, "id"> {}
export interface TodoOutput extends Required<TodoAttributes> {}

class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public dueDate!: Date;
  public dueTime!: string;
  public timezone!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    dueDate: DataTypes.DATE,
    dueTime: DataTypes.STRING,
    timezone: DataTypes.STRING,
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
  }
);

export default Todo;
