const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/users-const');

router.route('/') //set up get all and post routes at api/users
    .get(getAllUsers)
    .post(createUser)

router.route('/:id') //set up get, put and delete but _id
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

    router.route('/:userID/friends/:friendId') // post and delete friends 
    .post(addFriend)
    .delete(deleteFriend)

    module.exports = router;
