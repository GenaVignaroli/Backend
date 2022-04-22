const { timeStamp } = require("console");
const e = require("express");
const fs = require(`fs`);
const { v4: uuid } = require(`uuid`);
const { productosController } = require(`../controllers/contrProductos`);

class Carrito {
    constructor(a) {
        this.carrito = a;
    }

    async obtenerCarritos() {
        const carrito = await fs.promises.readFile(this.carrito, `utf-8`);
        return JSON.parse(carrito);
    }

    async guardarCarrito(c) {
        await fs.promises.writeFile(this.carrito, JSON.stringify(c, null, `\t`));
    }

    async crearCarrito(i) {
        const carrito = await this.obtenerCarritos();

        //const products = [i.forEach(productosController.getByID())]

        const nuevoCarrito = {
            id: uuid(),
            timestamp: Date.now(),
            productos: [],
        };
        
        carrito.push(nuevoCarrito);
        
        await this.guardarCarrito(carrito);  
    }

    //1) Buscar carrito por id
    //2) Por cada id de producto buscar producto
    //3) carrito.producto.push(producto)

    async cargarProductos(id, productos) {
        const carrito = await this.obtenerCarritos();

        const carritoObtenido = carrito[carrito.findIndex((e)=> e.id === id)]
        console.log(carritoObtenido);

        console.log(productos)

        productos.forEach()
        console.log(products);


    }

    async deleteCarrito(n) {
        const carrito = await this.obtenerCarritos();

        const newArray = carrito.filter((c)=> {
            c.id === n
        });

        await this.guardarCarrito(newArray);
    }

    async traerUnCarrito(n) {
        const carrito = await this.obtenerCarritos();

        const i = carrito.findIndex((p)=> {
            if(p.id === n) return true;
            else return false;
        });
        
        return carrito[i];   
    }
}

const carritosController = new Carrito(`carritos.json`);
//const productosController = new Carrito(`productos.json`);

module.exports = {
    carritosController: carritosController,
    //productosController: productosController,
}


