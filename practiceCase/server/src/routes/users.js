import jwt from 'jsonwebtoken'

module.exports = app => {

  const Users = app.db.models.Users;

  app.get('/users', app.get('protectedRoutes'), (req, res) => {
    Users.findAll({}, {
      attributes: ['id', 'name', 'email']
    })
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });

  app.get('/users/:id', app.get('protectedRoutes'), (req, res) => {
    Users.findOne({where:{id:req.params.id}}, {
      attributes: ['id', 'name', 'email']
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
  

  app.delete('/users/:id', app.get('protectedRoutes'), (req, res) => {
    Users.destroy({where: {id: req.params.id}})
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });

  app.post('/users', app.get('protectedRoutes'), (req, res) => {    
    Users.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });

  app.post('/autheticate', (req, res) => {
    if(req.body.user === "asfo" && req.body.password === "holamundo") {
        const payload = {
            check:  true
        };
        const token = jwt.sign(payload, app.get('privateKey'), {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    } else {
        res.json({ mensaje: "Invalid user or password"})
    }
});
};