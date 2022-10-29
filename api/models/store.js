'use strict';
const {
  Model
} = require('sequelize');
const Branch = require('./branch');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.hasMany(Branch, {
        foreignKey: 'store_id',
      });
    }
  }
  Store.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Store',
    underscored: true,
    paranoid: true,
    createdAt: 'date_entered',
    updatedAt: 'date_modified',
    deletedAt: 'date_deleted',
  });
  return Store;
};