import jwt from 'jsonwebtoken'

module.exports = app => {

  const Books = app.db.models.Books;
  const BorrowedBooks = app.db.models.BorrowedBooks;

  app.get('/books', app.get('protectedRoutes'), (req, res) => {
    Books.findAll({})
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });

  app.get('/books/:id', app.get('protectedRoutes'), (req, res) => {
    Books.findOne({
      where:{
        id: req.params.id
      }
    })
    .then(result => {      
      if (result !== null) {
        res.json(result)         
      } else {
        res.status(404).json({error: 'User not found'})
      }       
    })
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });
  

  app.delete('/books/:id', app.get('protectedRoutes'), (req, res) => {
    Books.destroy({where: {id: req.params.id}})
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });

  app.post('/books', app.get('protectedRoutes'), (req, res) => {      
    Books.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });
};