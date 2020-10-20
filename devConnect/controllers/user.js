const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const passport = require("passport");


exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  
  console.log(name+" body");
  try {
    let user = User.findOne({ email });
  
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
  
     user = new User({
      name: name,
      email: email,
      password: password,
    });
    console.log(name+" body");
    const salt = bcrypt.genSalt(10);
   user.password = bcrypt.hash(password, salt);
 
     user.save();
   
    const token = jwt.sign(
      { email: email, userId: user.id },
      process.env.JWT_KEY,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ token: token });
      }
    );
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Internal error",
    });
  }
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid authentication credentials!",
      });
    });
};
