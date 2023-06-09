const express = require('express');
const AccountModel = require('../app/models/Account');
const router = express.Router();



// Lấy dữ liệu từ database
router.get('/',(req, res, next) => {
    AccountModel.find({})
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('Error Server')
    })
})
// Lấy dữ liệu từ database
router.get('/:id',(req, res, next) => {
    var id = req.params.id
    AccountModel.findById(id)
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('Error Server')
    })
})



//Thêm mới dữ liệu trong db
router.post('/',(req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    AccountModel.create({
        username: username,
        password: password

    })
    .then(data =>{
        res.json('Add account successfully')
    })
    .catch(err =>{
        res.status(500).json('Error Server')
    })
    
})

//update dữu liệu trong db
router.put('/:id',(req, res, next) => {
    var id = req.params.id
    var newPassword = req.body.newPassword
    
    AccountModel.findByIdAndUpdate(id,{
        password: newPassword
    })
    .then(data =>{
        res.json('Update account successfully')
    })
    .catch(err =>{
        res.status(500).json('Error Server')
    })
    
})

//xóa dữ liệu trong db
router.delete('/:id',(req, res, next) => {
    var id=req.params.id
    AccountModel.deleteOne({
        _id:id
    })
    .then(data =>{
        res.json('Delete account successfully')
    })
    .catch(data =>{
        res.status(500).json('Error Server')
    })
    
})


module.exports = router;
