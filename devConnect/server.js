const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./middleware/routes/user');



const app = express();

mongoose
  .connect(
    "mongodb+srv://TiwariAv:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.a7ptb.mongodb.net/node-angular",
      { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!");
    
  });

  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
    next();
});

app.post("/api/user/signup",(req,res)=>{
  console.log('reached server'+req.body.name);
 res.send(req.body.name);
});

app.get('/',(req,res)=>{
  res.send('message got');
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// app.use("/api/user", userRoutes);





