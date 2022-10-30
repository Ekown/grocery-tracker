'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InvoiceItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InvoiceItem.belongsTo(models['Item']);
      InvoiceItem.belongsTo(models['Invoice']);
    }
  }
  InvoiceItem.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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