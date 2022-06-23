const { Router } = require ('express');
const fork = require( `child_process` );
const path = require(`path`);
const router = Router();
const {numCPUs} = require(`../server`) 
const users = [
]
const compression = require(`compression`);

router.get('/', (req, res) => {
  res.send('Servidor express ok!');
});

router.post('/login', (req, res) => {
  const { usuario } = req.body;

  const index = users.findIndex((aUser) => aUser.usuario === usuario && aUser.password === password);

  if(index < 0)
    res.status(401).json({ msg: 'no estas autorizado' });
  else {
    const user = users[index];
    req.session.info = {
      loggedIn: true,
      contador : 1,
      usuario : user.usuario,
      admin : user.admin,
    };
    res.json({msg: 'Bienvenido!!'})
  }
});

const validateLogIn = (req, res, next) => {
  if (req.session.info && req.session.info.loggedIn) next();
  else res.status(401).json({ msg: 'no estas autorizado' });
};

router.get('/secret-endpoint', validateLogIn, (req, res) => {
  req.session.info.contador++;
  res.json({
    msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.send('Logout ok!');
    else res.send({ status: 'Logout ERROR', body: err });
  });
});

router.get('/info',compression, validateLogIn, (req, res) => {
  console.log("Respondi bien");
  console.log("Me banco el profiling")
  res.send({
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
    cpu: numCPUs,
  });
});

const directorio = (`Directorio actual de trabajo ===> ${process.cwd()}`);
const idProcess = (`ID Del proceso actual ====> ${process.pid}`);
const version = (`Version de NodeJs corriendo ====> ${process.version}`);
const titulo = (`Titulo del proceso ====> ${process.title}`);
const sist = (`Sistema Operativo ====> ${process.platform}`);
const usoMemory =(`Uso de memoria====> ${JSON.stringify(process.memoryUsage())}`);
const codigoSalida = 0;

router.get('/infoprocess', (req,res) => {
  res.send({
    directorio,
    idProcess,
    version,
    titulo,
    sist,
    usoMemory,
    codigoSalida
  })
});

const scriptPath = path.resolve(__dirname, `../services/calculo.js`)
app.get(`randoms`, (req, res) => {
  const {cantidad} = req.query

  const computo = fork(scriptPath);
  computo.send(cantidad)
  computo.on(`message`, (random) => {
    res.json({
      resultado: random,
    })
  })
})

export default router;