const Course = require('../models/Course')
const AccountModel = require("../models/Account");
const jwt = require('jsonwebtoken');


class SiteController {
    //[GET]
    index(req, res, next) {
        Course.find({}).lean()
            .then(courses => {res.render('home',{
                courses
            })})
            .catch(next);
        }
    
    //[GET] /enterprise
    show1(req, res, next) {
        const token = req.cookies.token;
        const decodeToken = jwt.verify(token, "mk");
        AccountModel.find({_id:decodeToken._id}).then(function (data) {
            if(data.length==0){
                return res.redirect('/accounts/login');
            }else{
                if(data[0].role >=1){
                    next();
                }else{
                    return res.redirect('/accounts/login');
                }
            }
        })
    }
    show2(req, res, next) {
        res.render('enterprise')
    }

    //[POST] enterprise/edit/
    enterpriseEdit1(req, res, next) {
        const token = req.headers.cookie.split('=')[1];
        const decodeToken = jwt.verify(token, "mk");
        AccountModel.find({_id:decodeToken._id}).then(function (data) {
            if(data.length==0){
                return res.redirect('/accounts/login');
            }else{
                if(data[0].role >=2){
                    next();
                }else{
                    return res.json({
                        error:true,
                        message:"Bạn không có quyền sửa"
                    });
                }
            }
        })
    }
    enterpriseEdit2(req, res, next) {
        res.json("Sửa thành công")
    }


    search(req, res) {
        // res.render('search');
        res.render('fetch');

    }

    //[GET] /employee
    checkLogin(req, res, next) {
        //check account
        //Hàm đồng bộ
        try{
            const token = req.cookies.token
            const idUser = jwt.verify(token,'mk')
            AccountModel.findOne({ //gọi lên db xem account còn không
                _id : idUser
            })
            .then(data=>{
                if(data){
                    req.data = data

                    next()
                } else {
                    console.log(error)
                    res.json('Not permit')
                }
            })
            .catch(err=>{
            })
        } catch(eer){
            // res.status(500).json('Error token ')
            return res.redirect('/accounts/login');


        }
        
    }
    //[GET] /employee
    checkEmployee(req, res, next) {
        // const role =req.data.role
        if (parseInt(req.data.role) === 0) {
            // console.log(req.data.role)
            res.json('E PERMISSION');
          } else if (req.data.role >= 1) {
            res.json('E PERMISSION');
            next();
          } else {
            res.json('NOT PERMISSION');
          }
    }
    //[GET] /superAdmin
    checkAdmin(req, res, next) {
        if(req.data.role >= 2 ){
            res.json('A PERMISSION')
            next()
        } else {
            res.json('NOT   cccPERMISSION')
        }
    }
    checkSuperAdmin(req, res, next) {
        if(req.data.role >= 3 ){
            res.json('S_A PERMISSION')
            next()
        } else {
            res.json('NOT PERMISSION')
        }
    }
}

module.exports = new SiteController();
