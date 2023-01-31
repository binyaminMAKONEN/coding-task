const model = require('../models/model')
const bcrypt = require('bcrypt');


const create_User = async (req,res)=>{
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        //create new user
        const newUser = new model.users({
          username: req.body.username,
          position: req.body.position,
          password: hashedPassword,
        });  
    
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
}
const login =async (req,res)=>{
 try {
    
    const user = await model.users.findOne({username:req.body.username});
    !user && res.status(400).json('Wrong username or password')
    
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    )
    !validPassword && res.status(400).json('Wrong username or password')

    res.status(200).json(user)

  } catch (error) {
    res.status(500).json(error)
    
  }
}


module.exports = {
    create_User,
    login
}