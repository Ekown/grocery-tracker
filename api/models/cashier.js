'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cashier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Cashier.belongsTo(models['Invoice'], {
      //   foreignKey: 'cashier_id',
      // });
      Cashier.hasMany(models['Invoice'], {
        foreignKey: 'cashier_id',
      });
    }
  }
  Cashier.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cashier',
    underscored: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'date_entered',
    updatedAt: 'date_modified',
    deletedAt: 'date_deleted',
  });
  return Cashier;
};