const jwt = require("jsonwebtoken");
const AccountModel = require("../models/Account");

class AccountController {
  //[GET]/Account
  index(req, res) {
    res.render("Account");
  }
  //[GET] /Account/:slug
  getOne(req, res, next) {
    const id = req.params.id;
    AccountModel.findById(id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Error 5Server");
      });
  }
  //[GET]/Account
  get(req, res, next) {
    const page = parseInt(req.query.page);
    const pageSize = 6;
    if (page) {
      if (page < 0) {
        page = 1;
      }
      const skip = (parseInt(page) - 1) * pageSize;
      AccountModel.find({})
        .skip(skip)
        .limit(pageSize)
        .then((data) => {
          AccountModel.countDocuments({}).then((total) => {
            // alert(data.length)
            var totalPage = Math.ceil(total / pageSize);
            res.json({
              total: total,
              totalPage: totalPage,
              data: data,
            });
          });
        })
        .catch((err) => {
          res.status(500).json("Error server");
        });
    } else {
      AccountModel.find({})
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(500).json("Error Server");
        });
    }
  }
  //GET /accounts/register
  //POST//Account
  register(req, res, next) {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    AccountModel.findOne({
      email: email,
    })
      .then((data) => {
        if (data) {
          res.json("User already exists");
        } else {
          return AccountModel.create({
            fullname: fullname,
            email: email,
            password: password,
          });
        }
      })
      .then((data) => {
        res.render("login");
      })
      .catch((err) => {
        res.status(500).json("Not Register Successfully");
      });
  }

  //PUT/Account
  update(req, res, next) {
    const id = req.params.id;
    const newPassword = req.body.newPassword;

    AccountModel.findByIdAndUpdate(id, {
      password: newPassword,
    })
      .then((data) => {
        res.json("Update account successfully");
      })
      .catch((err) => {
        res.status(500).json("Error Server");
      });
  }
  //DELETE/Account/:id
  delete(req, res, next) {
    const id = req.params.id;
    AccountModel.deleteOne({
      _id: id,
    })
      .then((data) => {
        res.json("Delete account successfully");
      })
      .catch((data) => {
        res.status(500).json("Error Server");
      });
  }
  showRegister(req, res, next) {
    res.render("register");
  }

  login(req, res, next) {
    res.render("login");
  }


  authentication(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    AccountModel.findOne({
      email: email,
      password: password,
    })
      .then((data) => {
        if (data) {
          var token = jwt.sign(
            {
              _id: data._id,
            },
            "mk"
          );
          res.json({
            message: "Login Successfully",
            token: token,
          });
        } else {
          res.status(300).json("Account not exist");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("Not Login Successfully");
      });
  }

  private(req, res, next) {
    //bất đồng bộ
    try {
      var token = req.cookies.token;
      var ketqua = jwt.verify(token, "mk");
      if (ketqua) {
        next();
      }
    } catch (err) {
      return res.redirect('../accounts/login');
    }
  }
  handleRequest(req, res, next) {
    res.render("home");
  }
}

module.exports = new AccountController();
