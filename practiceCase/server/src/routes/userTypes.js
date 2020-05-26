import jwt from 'jsonwebtoken'

module.exports = app => {

  const UserTypes = app.db.models.UserTypes;

  app.get('/userTypes', app.get('protectedRoutes'), (req, res) => {
    UserTypes.findAll({}, {
      attributes: ['id', 'name', 'email'],      
    })
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });

  app.get('/userTypes/:id', app.get('protectedRoutes'), (req, res) => {
    UserTypes.findOne({where:{id:req.params.id}}, {
      attributes: ['id', 'name', 'email'],      
    })
    .then(result => {
      console.log(result)
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

  app.put('/userTypes/:id', app.get('protectedRoutes'), (req, res) => {
    UserTypes.findOne({where:{id:req.params.id}}, {      
    })
    .then(result => {
      console.log(result)
      if (result !== null) {
        result.update(req.body).then(()=>{
          res.sendStatus(204)
        })         
      } else {
        res.status(404).json({error: 'User not found'})
      }       
    })
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });
  

  app.delete('/userTypes/:id', app.get('protectedRoutes'), (req, res) => {
    UserTypes.destroy({where: {id: req.params.id}})
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });

  app.post('/userTypes', app.get('protectedRoutes'), (req, res) => {    
    UserTypes.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });
};