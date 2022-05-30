const express = require(`express`);
const http = require(`http`);
const io = require(`socket.io`);
const app = express();
const {subirItem} = require(`../DB/insertar`);
const { subirMsj } = require("../DB/instertarMsj");
const {editaItem} = require(`../DB/editarProd`);

const myServer = http.Server(app);

const puerto = 8080;
myServer.listen(puerto, () => console.log(`Server up en puerto`, puerto));

app.use(express.static(`public`));

const myWSServer = io(myServer);

const items = [];
const msjs = [];
const users = [];

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


module.exports = {
    items: items,
    msjs: msjs
}

