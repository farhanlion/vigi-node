'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Video.init({
    link: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    public_id:{
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.JSON
    },
    timestamp: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};
