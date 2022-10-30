'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.hasMany(models['InvoiceItem'], {
        foreignKey: 'invoice_id',
      });
      Invoice.belongsTo(models['Cashier']);
      Invoice.belongsTo(models['Bagger']);
      Invoice.belongsTo(models['Branch']);
    }
  }
  Invoice.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    subtotal: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    amount_paid: DataTypes.DECIMAL,
    change: DataTypes.DECIMAL,
    transaction_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Invoice',
    underscored: true,
    timestamps: false,
  });
  return Invoice;
};