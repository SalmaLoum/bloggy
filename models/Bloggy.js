const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Bloggy extends Model {}

Bloggy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Blog title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // description of blog
    description: {
      type: DataTypes.STRING,
    },
    // date of blog
    //Need to use ISO date method to convert date entered by user
    blog_date: {
      type: DataTypes.STRING,
      allowNull: false,
      // defaultValue: DataTypes.NOW,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // user_id referencing ID of User who created this blog

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bloggy',
  },
)
module.exports = Bloggy
