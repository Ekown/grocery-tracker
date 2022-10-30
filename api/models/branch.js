'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Branch.belongsTo(models['Store']);
      Branch.hasMany(models['Invoice'], {
        foreignKey: 'branch_id',
      });
    }
  }
  Branch.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Branch',
    underscored: true,
    timestamps: true,
    paranoid: true,
    createdAt: 'date_entered',
    updatedAt: 'date_modified',
    deletedAt: 'date_deleted',
  });
  return Branch;
};