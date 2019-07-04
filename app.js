var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const keys = require("./config/keys");
const passportSetup = require("./config/passport-setup");
const passport = require("passport");
const fetch = require("node-fetch");
const Sequelize = require("sequelize");
const Connection = require("./db/models").Connection;
// I am requiring the cookie-session that I installed
const cookieSession = require("cookie-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let mySongs = require("./routes/api/mysongs");
let myData = require("./routes/api/mydata");
let isLogged = require("./routes/api/islogged");
let recommendation = require("./routes/api/recommendation");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Here we configure cookieSession
app.use(
  cookieSession({
    // maxAge is a property that sets the time limit for the cookie
    maxAge: 24 * 60 * 60 * 1000,
    // we pass in in keys whatever we want and they will encrypt it.
    keys: [keys.session.cookieKey]
  })
);

// initialize passport
app.use(passport.initialize());
// We configure that we want to use session to control our logging in.
app.use(passport.session());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/islogged", isLogged);
app.use("/mydata", myData);
app.use("/recommendation/", recommendation);

// auth with spotify
app.use(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: [
      "user-library-read playlist-read-private user-read-private user-read-email user-read-birthdate user-read-recently-played user-top-read"
    ]
  })
);

// callback route for spotify to redirect to
app.use("/callback", passport.authenticate("spotify"), async (req, res) => {
  // no esta reconociendo el ip debido a que probablemente esta en localhost. Habria que probar sin localhost
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  let userAgent = req.headers["user-agent"];
  // No funciona,algun error en Connection.create
  const connection = Connection.build({
    date: "",
    browser_version: "",
    user_agent: "",
    ip: "",
    country: "",
    city: ""
  });
  console.log("reqheaders: " + req.headers["x-forwarded-for"]);
  console.log("reqconnection:" + req.connection.remoteAddress);
  console.log("ip: " + ip);
  await fetch("https://api.whatismybrowser.com/api/v2/user_agent_parse", {
    method: "POST",
    headers: {
      "x-api-key": keys.browser_api_access_key.key,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: JSON.stringify({ user_agent: userAgent })
  })
    .then(res => res.json())
    .then(apiResponse => {
      connection.user_agent = apiResponse.user_agent;
      connection.browser_version = apiResponse.software;
    });

  let ipDataURL =
    "http://api.ipstack.com/" +
    ip +
    "?access_key=" +
    keys.ip_api_access_key.key;

  await fetch(ipDataURL)
    .then(res => res.json())
    .then(apiResponse => {
      console.log(apiResponse);
    });

  connection.save().catch(error => {
    console.log("Connection data could not be saved: " + error);
  });
  // Successful authentication, redirect home.
  res.redirect("http://localhost:3000");
});

app.use("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

app.use("/mysongs", mySongs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
