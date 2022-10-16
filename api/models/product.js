'use strict';
const {
  Model
} = require('sequelize');
const Category = require('./category');
const Item = require('./item');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasOne(Category, {
        foreignKey: 'category_id',
      });
      Product.belongsTo(Item);
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    store_name: DataTypes.STRING,
    date_entered: DataTypes.DATE,
    date_modified: DataTypes.DATE,
    date_deleted: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
    underscored: true,
    paranoid: true,
    createdAt: 'date_entered',
    updatedAt: 'date_modified',
    deletedAt: 'date_deleted',
  });

  return Product;
};