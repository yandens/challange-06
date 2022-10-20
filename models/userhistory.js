'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserHistory.init({
    user_id: DataTypes.INTEGER,
    time_login: DataTypes.DATE,
    time_logout: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserHistory',
  });
  return UserHistory;
};
