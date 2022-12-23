const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name: {
      type: DataTypes.STRING,
      unique: 'compositeIndex', //puede ser cualquier nombre que compartan los atributos para poder fusionarse
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT
    },
    mana_cost:{
      type: DataTypes.FLOAT,
      unique: 'compositeIndex',
      allowNull: false,
      validate: {
        min:10.0,
        max:250.0
      }
    },
    summary: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} (${this.mana_cost} points of mana) - Description: ${this.description}`;
      }
    },
  })
}