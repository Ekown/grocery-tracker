'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models['Product']);
      Item.hasMany(models['InvoiceItem'], {
        foreignKey: 'item_id',
      });
    }
  }
  Item.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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