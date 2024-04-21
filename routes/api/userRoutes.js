const router = require('express').Router();
const {
    getUsers, getSingleUser, addUser, updateUser, deleteUser, addFriend, removeFriend, addThought
    } = require('../../controllers/userController');

router.route('/').get(getUsers).post(addUser);

router.route('/:username').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:username/thoughts').post(addThought);

router.route('/:username/friends').report(addFriend);

router.route('/:username/friends/:username').delete(removeFriend);

//Extra Credit: DELETE user and all their thoughts

module.exports = router;