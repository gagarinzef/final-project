"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User);
      Task.belongsTo(models.Project);
      // define association here
    }
  }
  Task.init(
    {
      ProjectId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "ProjectId is required",
          },
          notEmpty: {
            msg: "ProjectId is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },

      },
      date: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
