const db = require('../models');

const User = db.users;



/** Create User */
const createUser = async (req,res)=>{

    let newUser={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email
    };


    try{
        const user = await User.create(newUser);
        res.status(200).send(user);
        console.log(user);
    }
    catch (e) {
        res.status(400).send(e);
        console.log('Error',e);
    }

};


module.exports = {
    createUser
}