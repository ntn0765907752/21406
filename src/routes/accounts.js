const express = require("express");
// const AccountModel = require("../app/models/Account");
const router = express.Router();

const accountController = require('../app/controllers/AccountController');

router.get('/', accountController.get);
router.get('/register', accountController.showRegister);
router.get("/login", accountController.login );
router.get("/private", accountController.private, accountController.handleRequest );
router.post("/login", accountController.authentication );
router.post("/register", accountController.register); //Thêm mới dữ liệu trong db
router.put("/:id", accountController.update ); //update dữu liệu trong db
router.delete("/:id", accountController.delete );//xóa dữ liệu trong db




module.exports = router;
