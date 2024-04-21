const { ObjectId } = require('mongoose').Types;
const {User, Thought} = require('../models');

module.exports = {
    //GET all thoughts
    async getThoughts(req, res){
        try {
            const thought = await Thought.find();
            res.json(thought)
        }
        catch (err){
            return res.status(500).json(err);
        }
    },
    //GET single thought
    async getSingleThought(req, res){
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId});
            if (!thought){
                return res.status(404).json({ message: 'Thought not found'})
            }
            res.json(thought)
        }
        catch (err){
            return res.status(500).json(err);
        }
    },
    // POST thought
    async addThought(req, res){
        try {
            const thought = await Thought.create(req.body);
            res.json(thought)
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // PUT thought
    async updateThought(req, res){
        try {
            const thought = await Thought.findOneandUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body},
                { runValidators: true, new: true}
            );
            if (!thought){
                res.status(404).json({ message: 'Thought not found'});
            };
            res.json(thought)
        } catch (err){
            res.status(500).json(err)
        }
    },
    //DELETE thought
    async deleteThought(req, res){
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
            if (!thought){
                res.status(404).json({ message: 'Thought not found'})
            }
            //Double check this! It may be an issue
            await Reaction.deleteMany({ _id: { $in: thought.reactions}});
            res.json({ message: 'Thought deleted' })
        } catch (err){
            res.status(500).json(err);
        }
    },
    //POST reaction
    async addReaction(req, res){
        try {
            const reaction = await Reaction.create(req.body);
            res.json(reaction);
        } catch (err){
            return res.status(500).json(err)
        }
    },
    //DELETE reaction
    async deleteReaction(req, res){
        try{
            const reaction = await Reaction.findOneAndDelete({ _id: req.params.reactionId});

            if (!reaction){
                res.status(404).json({ message: 'Reaction not found'});
            }
            res.json({ message: 'Reaction deleted'})
        } catch (err){
            return res.status(500).json(err);
        }
    }
}