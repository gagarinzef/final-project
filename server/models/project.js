'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   Project.hasMany(models.Task);
    //   Project.belongsToMany(models.User, {through: models.UserProject, foreignKey: "ProjectId"});
    }
  }
  Project.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Project name is required"
        },
        notEmpty: {
          msg: "Project name is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};