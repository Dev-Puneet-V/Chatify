
require("dotenv").config();
const app = require("./app");
require('./services/socket.service');
require('./config/mongoose.config');
require('./config/passport.config')
const routes = require("./routes");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`)
});