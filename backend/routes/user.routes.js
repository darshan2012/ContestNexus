const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middelware');
const user = require('../models/user.model');
//user controller
router.get('/',authenticate,userController.getUser);
router.post('/signup', userController.signupUser);
//user controller

//user controller
router.post('/signin', userController.loginUser);


//user controller
router.post('/forgot-password', userController.forgotPassword);

//user controller
router.post('/reset-password', userController.resetPassword);

//user controller add middleware for auth
router.put('/update-profile', authenticate, userController.updateUser);

//get all users
router.get('/getAllUsernames', userController.getAllUsernames);

//get user info by username
router.post('/getUserInfo', userController.getUserInfo);
// router.post('/save-settings',);
//All related to code-environment

//code controller add middleware for auth
// router.post('/save-code',);

//code controller add middleware for auth
// router.delete('/delete-code/:id',);
router.delete('/', async (req, res) => {
  try {
    // Delete all users
    await user.deleteMany();
    res.status(200).json({ message: 'All users deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting users.' });
  }
});
router.post('/:username/verifyemail', userController.verifyEmail);

router.get('/:username',userController.getUserInfo);
router.get('/:username/leetcode', userController.getLeetcodeData);
router.get('/:username/codeforces', userController.getCodeforcesData);


module.exports = router;