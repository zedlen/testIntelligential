module.exports = (sequelize, DataType) => {

    const BorrowedBooks = sequelize.define('BorrowedBooks', {
      id: {
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV1,
        primaryKey: true
      },      
      book_loan_start:{
        type: DataType.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      loan_days:{
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      status:{
          type: DataType.ENUM(['IN_LOAN', 'RETURNED', 'PENDING', 'REJECTED']),
          allowNull: false,
          validate: {
            notEmpty: true
          }
      },
      book_id:{
        type: DataType.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
          notEmpty: true
        }
      },
      user_id:{
        type: DataType.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
          notEmpty: true
        }
      },

    });
  
    BorrowedBooks.associate = (models) => {
    };
  
    return BorrowedBooks;
  
  };