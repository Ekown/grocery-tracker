'use strict';
const {
  Model
} = require('sequelize');
const Item = require('./item');
const Invoice = require('./invoice');
module.exports = (sequelize, DataTypes) => {
  class InvoiceItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InvoiceItem.hasOne(Item, {
        foreignKey: 'item_id',
      });
      InvoiceItem.belongsTo(Invoice);
    }
  }
  InvoiceItem.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DECIMAL,
    total_price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'InvoiceItem',
    underscored: true,
    paranoid: true,
    createdAt: 'date_entered',
    updatedAt: 'date_modified',
    deletedAt: 'date_deleted',
  });
  return InvoiceItem;
};