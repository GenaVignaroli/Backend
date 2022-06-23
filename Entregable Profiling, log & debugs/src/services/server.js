const express = require(`express`);
const mainRouter = require(`../routes/index`);
const http = require(`http`);
const cookieParser = require(`cookie-parser`);
const session = require(`express-session`);
const MongoStore = require(`connect-mongo`);
const { a } = require(`../config`);
const {log} = require(`../services/loggers`)

const ttlSeconds = 180;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: a.MONGO_ATLAS_URL,
    crypto: {
      secret: 'squirrel',
    },
  }),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(session(StoreOptions));

app.use('/api', log, mainRouter);

app.use(function (err, req, res, next) {
  return res.status('500').json({
    msg: 'There was an unexpected error',
    error: err.message,
  });
});

const httpServer = http.Server(app);

module.exports =  {httpServer: httpServer};