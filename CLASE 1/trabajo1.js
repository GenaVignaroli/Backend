class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        console.log(`El nombre completo es: ${this.nombre} ${this.apellido}`)

    }

    addMascota(mascota) {
        console.log(this.mascotas.push(mascota));
    }

    countMacotas() {
        console.log(this.mascotas);
    }

    addBook(libro) {
        console.log(this.libros.push(libro));
    }

    getBookNamer() {
        console.log(this.libros)
    }

}

let a = new Usuario (`Genaro`, `Vignaroli`, [{nombre:`El limonero real`, autor:`juan jose saer`},{nombre: `100 años de soledad`,autor:`Gracia marquez`}, {nombre:`Rayuela`, autor:`Borges`}], [`perro`, `gato`])

a.getFullName();
a.addMascota(`conejo`);
a.countMacotas();
a.addBook({nombre:`el señor de los anillos`, autor:`tolkien`});
a.getBookNamer();


