//const { v4 : uuid } = require(`uuidv4`)
const fs = require(`fs`);

class Pro {
    constructor(nombreObj, precio, thumbail, id){
        this.nombreObj = nombreObj;
        this.precio = precio;
        this.thumbail = thumbail,
        this.id = id
    }

    
}

const pelota = new Pro(`Pelota`, 2000, `https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/47fdd9b4f6164746b531ad4800964610_9366/pelota-competition-argentina-21.jpg`)
const arco = new Pro(`Arco`, 10000, `https://images.fravega.com/f1000/7f6de2f3839415fe8120477265524f2e.jpg`)



class Contenedor {
    constructor (nombre) {
        this.nombre = nombre;
        this.archivo = `./${nombre}.json`
        this.producto = []

    const data = {
        nombre: this.nombre,
        archivo: this.archivo,
        producto: this.producto
    }

        fs.writeFileSync(this.archivo, JSON.stringify(data, null, `\t`))
    }

    readFile(){
        const data = fs.readFileSync(this.archivo, `utf-8`)
        return JSON.parse(data);
    }

    escribir(data){
        fs.writeFileSync(this.archivo, JSON.stringify(data, null, `\t`))
    }

    getName () {
        const data = this.readFile();
        return `${data.nombre}`
    }

    save() {
       
        const p1 = {
            id: this.producto.length + 1,
            info: pelota
        }
        const data = this.readFile();
        data.producto.push(p1);
        this.escribir(data);

    }

    getById() {
        if(true){
            const data = this.readFile();
            const id = data.producto.map((producto)=> producto.id)
            return id;
        }
    }

    getAll() {
        const data = this.readFile();
        const producto = data.producto.map((producto)=> producto)
        return producto;
    }

    deleteById() {
        const data = this.readFile();
        const producto = data.producto.map((producto)=> producto.id)
        producto.shift(producto);
        this.escribir(data);
    }

    deleteAll() {
        const data = this.readFile();
        const producto = data.producto.shift();
        this.escribir(producto);
    }

}

let a = new Contenedor(`Productos`);

console.log(a.getName())

a.save(pelota)

console.log(a.getById(1));
console.log(a.getAll());
//console.log(a.deleteById(1));
//console.log(a.deleteAll());




