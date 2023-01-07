const bcrypt = require("bcrypt");
const Users  = require('../models/Users')

async function registerUser(req,res){
        try {
          const hash = bcrypt.hashSync(req.body.password, 10);
          Users.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
              req.body.password = hash
              const userData =  Users.create(req.body);
              if (userData) {
                res.json({ msg: "user is added" });
              } else {
                res.json({ msg: "something went worng" });
              }
            } else {
              res.status(409).json({ error: "user already exists" });
            }
          });
        } catch (err) {
          console.log(err);
        }
}

async function loginUser(req, res){
    try{
        const {email, password } = req.body;
    // means const email = req.body.email;
    // const password = req.body.password;
  
        const user = await Users.findOne({ email });
        if(user){
          //  res.status(400).json({ msg: 'eamil exists'});
  
           const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch){
             res.status(400).json({ msg: 'Incorrect password'});
             }
          else{
            res.status(200).json({  msg: 'correct password and email', userList: user});
          }
        }
        else{
          res.status(400).json({ msg: 'No such eamil exists'});
        }      
      }
    catch(e){
        res.status(500).json({error: e.message});
    }
  
  
}

module.exports = {registerUser, loginUser}