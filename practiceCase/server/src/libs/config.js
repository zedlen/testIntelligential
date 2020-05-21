module.exports = {
  database: 'library',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'library-db.sqlite',
    define: {
      underscored: true
    },
    operatorsAliases: false
  },
  privateKey: process.env.PRIVATE_KEY || "miclaveultrasecreta123*"
};