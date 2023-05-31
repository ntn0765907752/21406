const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require('method-override');
const handlebars = require("express-handlebars").engine;

const app = express();
const port = 3000;
const route = require("./routes");
const db = require("./config/db");

app.use(methodOverride('_method'))
//connect to DB
db.connect();

app.use(express.static(__dirname + "/public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());


//HTTP logger
app.use(morgan("combined"));
//Template engine
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    helpers:{
      sum: (a, b)=> a + b,
    }
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//route
route(app);

app.listen(port, () => {
  console.log(`App listening on at http://localhost:${port}`);
});
