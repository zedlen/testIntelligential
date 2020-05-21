module.exports = (sequelize, DataType) => {

    const Books = sequelize.define('Books', {
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
      author: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      editorial: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      publishDate: {
        type: DataType.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      availableCopies: {
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    });
  
    Books.associate = (models) => {
        Books.belongsToMany(models.Users, { through: models.BorrowedBooks });
    };
  
    return Books;
  
  };