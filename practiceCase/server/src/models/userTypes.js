module.exports = (sequelize, DataType) => {

    const UserTypes = sequelize.define('UserTypes', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },      
      permissions: {
        type: DataType.JSON,        
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    });
  
    UserTypes.associate = (models) => {
              
    };
  
    return UserTypes;
  
  };