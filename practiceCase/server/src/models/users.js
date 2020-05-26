module.exports = (sequelize, DataType) => {

  const Users = sequelize.define('Users', {
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
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Users.associate = (models) => {
    Users.belongsTo(models.UserTypes, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
    Users.belongsToMany(models.Books, { through: { model: models.BorrowedBooks, unique: false }, foreignKey: {name: 'user_id', allowNull: false, unique: false } });
  };

  return Users;

};