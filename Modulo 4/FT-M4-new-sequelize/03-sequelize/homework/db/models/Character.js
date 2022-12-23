const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code: {
      type : DataTypes.STRING(5),
      primaryKey: true,
      validate: {
        isNotHENRY(value){
          if(value.toLowerCase() === 'henry'){
            throw new Error('Any combination of HNERY characters is not allowed')
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notIn: [['Henry', 'SoyHenry', 'Soy Henry']]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      //   get() {
      //    let edad = this.getDataValue('age')
      //    if(!edad){
      //      return edad
      //    }
      //    return edad  + ' years old';
      //  }
    },
    race:{
      type: DataTypes.ENUM('Human', 'Elf', 'Machine','Demon','Animal','Other'),
      defaultValue: 'Other',
    },
    hp: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    mana:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date_added:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  },
  {timestamps: false});
}