const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  // * = singifica que es obligatorio este campo, 
  sequelize.define('dog', { // * Id de la raza
    id: {
      type: DataTypes.UUID,
      defaultValue :DataTypes.UUIDV4,
      allowNull: false,
      primaryKey : true
    },
    name: {  // * nombre de la raza
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightMax: {   // * añtura de la raza
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightMin: {   // * añtura de la raza
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightMax: {  // * peso de la raza
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightMin: {  // * peso de la raza
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span :  {  // vida  de la raza
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDb: { // creado en database 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    image: {
      type : DataTypes.TEXT,
      allowNull : true
    }
  },
  {
    timestamps: false,
  }
  );
};
