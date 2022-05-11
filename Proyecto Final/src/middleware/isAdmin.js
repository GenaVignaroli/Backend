module.exports = function isAdmin(req, res, next) {
    const headers = req.headers;
    const isAdmin = headers.admin;
    if (isAdmin) {
      next();
    } else {
      res
        .status(403)
        .send(`Crea un ususario o inicia sesión para seguir navegando!`);
    }
  };