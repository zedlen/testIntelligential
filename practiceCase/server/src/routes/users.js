import jwt from 'jsonwebtoken'

module.exports = app => {

  const Users = app.db.models.Users;
  const UserTypes = app.db.models.UserTypes;
  const Books = app.db.models.Books;

  app.get('/users', app.get('protectedRoutes'), (req, res) => {
    Users.findAll( {
      attributes: ['id', 'name', 'email'],
      include:[{
        model: UserTypes,
        attributes:['name', 'id']        
      }]
    })
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
  });

  app.get('/users/:id', app.get('protectedRoutes'), (req, res) => {
    Users.findOne({
      where:{
        id: req.params.id
      },
      attributes: ['id', 'name', 'email'],
      include:[{
        model: UserTypes, 
        attributes:['name', 'id']       
      }]
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

  app.get('/profile', app.get('protectedRoutes'), (req, res) => {   
    Users.findOne({
      where:{
        id:req.decoded.id
      },
      include:[
        Books,
        UserTypes
      ]
    }).then(user=>{
      if (user !== null) {
        
        res.json({
          name: user.name,
          email: user.email,
          permissions: user.UserType.permissions,
          books: user.Books,          
        })
      } else {
        res.sendStatus(404)
      }
    })    
  });

  app.put('/users/:id', app.get('protectedRoutes'), (req, res) => {
    Users.findOne({where: {id: req.params.id}})
      .then(user => {
        if(user !== null){          
          user.update(req.body).then(()=>{
            res.sendStatus(204)
          })
        } else {
          res.status(404).json({message:'user  not found'})
        }
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });


  app.get('/token/renew', app.get('protectedRoutes'), (req, res) => {      
    let payload = req.decoded
    delete payload.iat
    delete payload.exp
    const token = jwt.sign(payload, app.get('privateKey'), {
      expiresIn: 1440
    });
    res.json({
      mensaje: 'New Token generated',
      token: token
    });         
    
  });

  app.post('/autheticate', (req, res) => {
    Users.findOne({
      where: {
        email: req.body.user,
        password: req.body.password 
      },
      attributes: ['id', 'name', 'email'],
      include:[{
        model: UserTypes, 
        attributes:['name', 'id', 'permissions']       
      }]
    }).then(result => {      
      if (result !== null) {
        const payload = {
          id: result.id,
          name: result.name,          
          userTypeId: result.UserType.id,
          userTypeName: result.UserType.name,
          permissions: JSON.stringify(result.UserType.permissions),
        }
        const token = jwt.sign(payload, app.get('privateKey'), {
          expiresIn: 60 * 60 * 24
        });
        res.json({
          mensaje: 'Welcome',
          token: token
        }); 
      } else {
        res.status(404).json({error: 'User not found'})
      }       
    })
    .catch(error => {
      res.status(412).json({msg: error.message});
    });
    
});
};