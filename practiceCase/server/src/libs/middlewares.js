import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors'

const premission ={
  users:{
    module: 'users',
    methods:{
      POST:'create',
      GET:'list',
      PUT:'update',
      DELETE: 'delete'
    }
  },
  userTypes:{
    module: 'users',
    methods:{
      POST:'create',
      GET:'list',
      PUT:'update',
      DELETE: 'delete'
    }
  },
  profile:{
    module: 'users',
    methods:{
      POST:'create',
      GET:'list',
      PUT:'update',
      DELETE: 'delete'
    }
  },
  profile:{
    module: false
  },
  books:{
    module: 'books',
    methods:{
      POST:'create',
      GET:'list',
      PUT:'update',
      DELETE: 'delete'
    }
  },
  borrow:{
    module: 'books',
    methods:{
      POST:'borrow'
    }
  },
  returnBook:{
    module: 'books',
    methods:{
      POST:'update',
    }
  },
  rejectLoan:{
    module: 'books',
    methods:{
      PUT:'update',      
    }
  },
  acceptLoan:{
    module: 'books',
    methods:{
      PUT:'update',      
    }
  },
  loans:{
    module: 'books',
    methods:{      
      GET:'list',      
    }
  },
}

module.exports = app => {

  // Settings
  app.set('port', process.env.PORT || 3001);
  app.set('json spaces', 4);
  app.set('privateKey',app.libs.config.privateKey);

  // middlewares
  app.use(cors());
  app.use(express.json());
  app.use(function(err, req, res, next) {    
    res.status(500).json(err);
  });  
  const protectedRoutes = express.Router(); 
  protectedRoutes.use((req, res, next) => {
      const token = req.headers['access-token'];      
      if (token) {
        jwt.verify(token, app.get('privateKey'), (err, decoded) => {                
          if (err) {
            return res.status(403).json({ mensaje: 'Invalid Token' });    
          } else {  
            decoded.permissions = JSON.parse(decoded.permissions)                    
            const p = premission[req.path.split('/')[1]]
            if(!p.module){
              req.decoded = decoded;                
              next();  
            } else {
              const userModulePermissions = decoded.permissions[p.module]
              if (userModulePermissions === undefined) {
                return res.status(401).json({ mensaje: 'No permission' });    
              }              
              const hasPermission = userModulePermissions.indexOf(p.methods[req.method]) > -1              
              if (hasPermission) {
                req.decoded = decoded;                
                next();  
              } else {
                return res.status(401).json({ mensaje: 'No permission' });    
              }
            }
          }
        });
      } else {
        res.status(401).send({ 
            mensaje: 'No token in headers.' 
        });
      }
  });
  app.set('protectedRoutes',protectedRoutes);

};