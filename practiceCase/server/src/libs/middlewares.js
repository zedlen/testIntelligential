import express from 'express';
import jwt from 'jsonwebtoken'
module.exports = app => {

  // Settings
  app.set('port', process.env.PORT || 3000);
  app.set('json spaces', 4);
  app.set('privateKey',app.libs.config.privateKey);

  // middlewares
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
            return res.json({ mensaje: 'Invalid Token' }).status(403);    
          } else {
            req.decoded = decoded;    
            next();
          }
        });
      } else {
        res.send({ 
            mensaje: 'No token in headers.' 
        }).status(401);
      }
  });
  app.set('protectedRoutes',protectedRoutes);

};