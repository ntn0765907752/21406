const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require('method-override');
const handlebars = require("express-handlebars").engine;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const SortMiddleware =require('./app/middleware/SortMiddleware');

const route = require("./routes");
const db = require("./config/db");

//connect to DB
db.connect();

app.use(cookieParser())

//cors
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(methodOverride('_method'));
//Custom middleware
app.use(SortMiddleware);

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//HTTP logger
app.use(morgan("combined"));
//Template engine
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    helpers:{
      sum: (a, b)=> a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type :'default';

        const icons = {
          default: 'fa-solid fa-sort',
          asc: 'fa-solid fa-arrow-down-wide-short',
          desc: 'fa-solid fa-arrow-up-wide-short',
        };
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };
        const icon = icons[sortType];
        const type = types[sortType];
      
        return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`;
      }
      
      
    },
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//route
route(app);

app.listen(port, () => {
  console.log(`App listening on at http://localhost:${port}`);
});