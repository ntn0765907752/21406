const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/fetch', siteController.search);
router.get('/enterprise', siteController.show1, siteController.show2);
router.post('/enterprise/edit', siteController.enterpriseEdit1, siteController.enterpriseEdit2);
router.get('/employee', siteController.checkLogin,siteController.checkEmployee);
router.get('/admin', siteController.checkLogin, siteController.checkAdmin);
router.get('/superadmin',siteController.checkLogin, siteController.checkSuperAdmin);


router.get('/', siteController.index);

module.exports = router;
