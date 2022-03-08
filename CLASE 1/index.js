
function mostrarLista (lista)  {
  if(true) {
      console.log(lista)
  }
  else{
      console.log(`Lista vacía`)
  }
}

mostrarLista([`pan`, `papa`, `leche`, `carne`]);

const lista = function (lista) {
    if(true){
        console.log(lista)
    }
    else{
        console.log(`Lista vacía`)
    }
}

lista([1,2,3]);


//CLASES

class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

   /*Metodo*/ saludar() {
        console.log(`Hola mi nombre es ${this.nombre} y tengo ${this.edad} años`);
    }
   /*Metodo Estatico*/ static definicion(){
        console.log(`Una persona es un ser humano`)
    }
}

let persona = new Persona(`Genaro`, 24);

persona.saludar(); //Esto es una instancia. No se puede acceder a un metodo estatico mediante una instancia.

Persona.definicion();

//Herencia de clase

class Desarrollador extends Persona {

    constructor(nombre, edad, tipo) {
        super(nombre, edad);
        this.tipo = tipo;
    }

    saludoDesarrollador(){
        this.saludar();
        console.log(`Soy un ${this.tipo} developer`);
    }

}

let desarrollador = new Desarrollador(`Genaro`, 24,`Frontend`);

desarrollador.saludoDesarrollador();

console.log(typeof Desarrollador);//---> Una clase no es mas que una funcion.


class Contador {
    constructor(nombre, contador) {
        this.nombre = nombre;
        this.contador = contador;
    }

    static cuenta = (this.contador)

    contadorTotal() {
        console.log(Contador.cuenta)
    }

    obtenerResponsable(){
        console.log(this.nombre)
    }

    obtenerCuentaIndividual() {
        console.log(this.contador)
    }

    obtenerCuentaGlobal() {
        console.log(Contador.cuenta)
    }
    
    contar() {
        console.log(this.contador+1)
    }

}

const a = new Contador (`pablo`, 0)
const b = new Contador (`mariela`, 6)
const c = new Contador (`valentina`, 3)
const d = new Contador (`genaro`, 0)

console.log(a);
console.log(b);
console.log(c);
console.log(d);

