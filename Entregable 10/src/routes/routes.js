const { Router } = require ('express');
const router = Router();

const users = [
]

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

router.get('/info', validateLogIn, (req, res) => {
  res.send({
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
});

export default router;