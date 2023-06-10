const express = require("express");
// const AccountModel = require("../app/models/Account");
const router = express.Router();

const accountController = require('../app/controllers/AccountController');

router.get('/', accountController.get);
router.get("/login", accountController.login );
router.get("/private/:token", accountController.private, accountController.handleRequest );
router.get('/:id', accountController.getOne);
router.post("/login", accountController.authentication );
router.post("/", accountController.addAcount); //Thêm mới dữ liệu trong db
router.put("/:id", accountController.update ); //update dữu liệu trong db
router.delete("/:id", accountController.delete );//xóa dữ liệu trong db

router.post('/êregister',(req, res, next) => {
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

router.post('/llogin',(req, res, next) => {
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
