const express = require("express");


const productos = [
    {
        "nombre": "Escuadra",
        "precio": 500,
        "id": 1
    },
    {
        "nombre": "Regla",
        "precio": 350,
        "id": 2
    },
    {
        "nombre": "Calculadora",
        "precio": 1200,
        "id": 3

    }
]

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
    console.log(`Server iniciado en puerto: `, puerto)
);

server.on(`error`, (err) => {
    console.log(`ERROR`, err);
});

app.get(`/productos`, (req, res)=>{
    
    let info;

    info = productos;

    res.json({
        info, 
    });
});

app.get(`/productos/:id`, (req, res)=>{
    console.log(req.params);
    const idBuscado = req.params.id;
  
    const producto = productos.find((a) => a.id == idBuscado);

    info = producto;
    res.json({
        info,
    });
});
