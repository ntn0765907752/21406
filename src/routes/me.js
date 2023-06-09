const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');
const AccountModel = require('../app/models/Account');

router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);

router.post('/register',(req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    AccountModel.findOne({ 
        username: username, 
    })
    .then(data => {
        if(data){
            res.json('User already exists')
        } else {
            return AccountModel.create({
                username: username,
                password: password
            })
        }
    })
    .then(data => {
        res.json(' Register succesfully')

    })
    .catch(err=>{
        res.status(500).json('Not Register Successfully')

    })

})

router.post('/login',(req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({ 
        username: username, 
        password: password
    })
    .then(data=>{
        if( data){
            res.json('Login Successfully')
        } else {
            res.status(300).json('Account not exist')
        }


    })
    .catch(err=>{
        res.status(400).json('Not Login Successfully')
    })
})



module.exports = router;
