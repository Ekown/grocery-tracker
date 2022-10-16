'use strict';
const {
  Model
} = require('sequelize');
const Invoice = require('./invoice');
module.exports = (sequelize, DataTypes) => {
  class Bagger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bagger.belongsTo(Invoice);
    }
  }
  Bagger.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bagger',
    underscored: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'date_entered',
    updatedAt: 'date_modified',
    deletedAt: 'date_deleted',
  });
  return Bagger;
};