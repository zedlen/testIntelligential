module.exports = app => {

  app.db.sequelize.sync({force:true}).done(() => {
    // Populate DB for tests
    const Users = app.db.models.Users;
    const UserTypes = app.db.models.UserTypes;
    const Books = app.db.models.Books;
    Books.create({
      name: "Real Book",
      author: "Jonh Doe",
      editorial: "Magic House",
      publishDate: new Date(),
      availableCopies: 5,
    })
    UserTypes.create({
      name: "User",
      permissions: {"books":["borrow","list"]}
    })
    UserTypes.create({
      name: "Admin",
      permissions: {"books":["create","delete","update","list"],"users":["create","delete","update","list"],"loans":["create","delete","update","list"]}
    })
    Users.create({
      name: "Admin 1",
      password: "admin123",
      email: "admin@mail.com",
      UserTypeId: 2
    })
    Users.create({
      name: "Test Users",
      password: "test123",
      email: "test@mail.com",
      UserTypeId: 1
    })

    // init app
    app.listen(app.get('port'), () => {
      console.log('Server on port', app.get('port'));
    });
  });

};