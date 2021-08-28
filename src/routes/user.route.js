const express = require('express');
const router = express.Router();
var authCtrl = require('../controllers/auth.controller');
var userCtrl = require('../controllers/user.controller');
//auth routes

router.post('/register', authCtrl.newUser);
router.post('/login',authCtrl.loginUser);
router.post('/myprofile', authCtrl.getProfile);
router.put('/chprofile/:id', authCtrl.updateDetails);

// user Routes

router.post('/user/allusers', userCtrl.getUser);
router.post('/user/adduser', userCtrl.newUser);
router.put('/user/chuser/:id', userCtrl.chUser);
router.delete('/user/rmuser/:id', userCtrl.rmUser);

module.exports = router
