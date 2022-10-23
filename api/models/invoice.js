'use strict';
const {
  Model
} = require('sequelize');
const InvoiceItem = require('./invoiceitem');
const Bagger = require('./bagger');
const Cashier = require('./cashier');
const Branch = require('./branch');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.hasMany(InvoiceItem, {
        foreignKey: 'invoice_id',
      });
      Invoice.hasOne(Cashier, {
        foreignKey: 'invoice_id',
      });
      Invoice.hasOne(Bagger, {
        foreignKey: 'invoice_id',
      });
      Invoice.belongsTo(Branch);
    }
  }
  Invoice.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
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