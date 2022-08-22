const express = require ('express');
const io = require(`socket.io`);
const http = require(`http`);
const MongoStore = require ('connect-mongo');
const passport = require ('passport');
const session = require ('express-session');
const Config = require ('../config');
const { signUpFunc, loginFunc } = require ('./auth');
const mainRouter = require ('../routes');
const Logger = require ('./login');

const app = express();

app.use(express.static(`public`));

const myServer = http.Server(app);
const myWSServer = io(myServer);

const items = [];
const msjs = [];

myWSServer.on(`connection`, (socket)=> {
    console.log(`Nuevo cliente conectado!`);

    socket.on(`new-item`, function (producto) {
        const newItem = {
            name: producto.nombre,
            price: producto.precio,
            foto: producto.foto,
        };
        console.log(newItem)
        items.push(newItem)

        myWSServer.emit(`items`, items);
        subirItem(newItem)
    });

    socket.on(`askData`, (data) => {
        console.log(`Me llego la data`)
        socket.emit(`items`, items)
    });

    socket.on(`new-msj`, function (mensaje) {
        const newMsj = {
            user: mensaje.usuario,
            hora: mensaje.hora,
            message: mensaje.msj,
        }
        console.log(newMsj);
        msjs.push(newMsj);

        myWSServer.emit(`msjs`, msjs)
        subirMsj(newMsj)
    });

    socket.on(`askMsj`, (data)=> {
        console.log(`Me llego el msj`);
        socket.emit(`msjs`, msjs)
    });

    socket.on(`user`, function (user) {
        const newUser = {
            user: user.usuario,
        }
        console.log(newUser);
        msjs.push(newUser);

        myWSServer.emit(`user`, user)
        subirMsj(newUser)
    });

    socket.on(`askMsj`, (data)=> {
        console.log(`Me llego el user`);
        socket.emit(`user`, users)
    });
});

app.use(express.json());

const ttlSeconds = 1800;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_ATLAS_URL,
    crypto: {
      secret: Config.SESSION_SECRET_KEY,
    },
  }),
  secret: Config.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

app.use(session(StoreOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

app.use('/api', mainRouter);

app.use(function (err, res) {
  const status = err.statusCode || 500;
  const msg = err.message || 'Internal Server Error';
  const stack = err.stack;
  Logger.error(err);
  res.status(status).send({ msg, stack });
});

module.exports =  app;