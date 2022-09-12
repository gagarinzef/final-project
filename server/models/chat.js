'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.User)
      Chat.belongsTo(models.Project)
    }
  }
  Chat.init({
    ProjectId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    chat: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "chat value is required"
        },
        notEmpty: {
          msg: "chat value is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};