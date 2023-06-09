const express = require('express');
const AccountModel = require('../app/models/Account');
const router = express.Router();



// Lấy dữ liệu từ database
router.get('/', (req, res, next) => {
    const page = parseInt(req.query.page);
    const pageSize = 2;

    if (page) {
        if(page < 0){
            page = 1
        }
        const skip = (parseInt(page) - 1) * pageSize;
        AccountModel.find({})
            .skip(skip)
            .limit(pageSize)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json('Error server');
            });
    } else {
        AccountModel.find({})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json('Error Server');
            });
    }
});

// Lấy dữ liệu từ database
router.get('/getone/:id',(req, res, next) => {
    const id = req.params.id
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
    const username = req.body.username
    const password = req.body.password
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

//update dữu liệu trong db
router.put('/:id',(req, res, next) => {
    const id = req.params.id
    const newPassword = req.body.newPassword
    
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
    const id=req.params.id
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
