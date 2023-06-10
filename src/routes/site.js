const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/enterprise', siteController.show1, siteController.show2);
router.get('/enterprise/edit', siteController.show1, siteController.show2);
router.get('/employee', siteController.checkLogin,siteController.checkEmployee);
router.get('/admin', siteController.checkLogin, siteController.checkAdmin);
router.get('/superadmin',siteController.checkLogin, siteController.checkSuperAdmin);


router.get('/', siteController.index);

module.exports = router;
