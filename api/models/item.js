'use strict';
const {
  Model
} = require('sequelize');
const InvoiceItem = require('./invoiceitem');
const Product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasOne(Product, {
        foreignKey: 'product_id',
      });
      Item.belongsTo(InvoiceItem);
    }
  }
  Item.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    sku: DataTypes.BIGINT,
    size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
    underscored: true,
    paranoid: true,
    createdAt: 'date_entered',
    updatedAt: 'date_modified',
    deletedAt: 'date_deleted',
  });
  return Item;
};