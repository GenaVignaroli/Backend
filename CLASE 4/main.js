const perrito = `GUAU!!`;

console.log(perrito);


const between = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};


const minimo = 1;
const maximo = 21;
const resultado = {}


for (let num = 0; num<10000; num++) {
    const numero = between(minimo, maximo);

    if(resultado[numero]) 
        resultado[numero] = resultado[numero] + 1;

    else
        resultado[numero] = 1;
};

console.log(resultado)


const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]


const nombres = productos.map((producto) => producto.nombre)

let ejercicioA = nombres.join(`,`)

//console.log(ejercicioA)

let ejercicioB = 0;

productos.forEach((producto) => { ejercicioB += producto.precio;
}) 

//console.log(ejercicioB)

let ejercicioC = (ejercicioB / productos.length);

//console.log(ejercicioC);


