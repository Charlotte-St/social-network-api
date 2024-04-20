const { ObjectId } = require('mongoose').Types;
const {User, Thought} = require('../models');

module.exports = {
    //GET all users
    async getUsers(req, res){
        try {
            const users = await User.find();

            const userObj = {
                users
            }
            res.json(userObj)
        }
        catch (err){
            return res.status(500).json(err);
        }
    },

    //GET a single user
    async getSingleUser(req, res){
        try {
            const user = await User.findOne({ _id: req.params.username}).select('-__v');
            if (!user){
                return res.status(404).json({ message: 'User not found'})
            }
            res.json({
                user, 
                thoughts: await thoughts(req.params.username)
            })
        }
        catch (err){
            return res.status(500).json(err);
        }
    },
    //POST User
    async addUser(req, res){
        try{
           const user = await User.create(req.body);
           res.json(user);
        }  
        catch (err){
            return res.status(500).json(err)
        }
    },
    //PUT User
    //DELETE User
    async deleteUser(req, res){
        try{
            const user = await User.findOneAndDelete({ _id: req.params.username})

            if (!user){
                return res.status(404).json({message: 'User not found'})
            }
        }
        catch(err) {
            return res.status(500).json(err)
        }
    },
    //POST Friend
    // DELETE Friend
}