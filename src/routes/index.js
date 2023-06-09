const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const accountRouter = require('./accounts');


function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/account', accountRouter);
    

    app.use('/', siteRouter);


}

module.exports = route;
