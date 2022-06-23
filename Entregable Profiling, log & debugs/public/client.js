const socket = io.connect(`http://localhost:8080`, { forceNew: true});

socket.emit(`askData`);
socket.emit(`askMsj`);
socket.emit(`askUser`);


const sendData = ((e)=> {
  const nombre = document.getElementById(`nombre`);
  const precio = document.getElementById(`precio`);
  const foto = document.getElementById(`foto`);

  const producto ={
    nombre: nombre.value,
    precio: precio.value,
    foto: foto.value,
  };
  socket.emit(`new-item`, producto);
});

const render = ((data)=> {
  let html = data.map((elem, index)=> {
    return(`
        <td>${elem.name}</td>
        <td>$ ${elem.price}</td>
        <td>${elem.foto}</td>
      `)
  }).join(` `);
  document.getElementById(`new-item`).innerHTML = html;
});

socket.on(`items`, (data) =>{
  console.log(`RECIBI EL ITEM`)
  render(data);
});


const sendMsj = ((e)=> {
  const usuario = document.getElementById(`usuario`);
  const msj = document.getElementById(`msj`);
  const hora = Date.now()

  const mensaje = {
    usuario: usuario.value,
    hora: hora,
    msj: msj.value,
  };
  socket.emit(`new-msj`, mensaje)
});

const render1 = ((data)=> {
  let html = data.map((elem, index) => {
    return(`
      <ol>
        <li>${elem.user} ${elem.hora} : ${elem.message}</li>
      </ol>
    `)
  }).join(` `);
  document.getElementById(`new-msj`).innerHTML = html
});

const ingresarUser = ((e)=> {
  const usuario = document.getElementById(`name`);

  const user = {
    usuario: usuario.value,
  };
  socket.emit(`user`, user)
});

const render2 = ((data)=> {
  let html = data.map((elem, index) => {
    return(`
      <div>
      <h1>BIenvenid@: ${elem.name}</h1>
      </div>
    `)
  }).join(` `);
  document.getElementById(`new-msj`).innerHTML = html
});

socket.on(`msjs`, (data)=>{
  console.log(`RECIBI EL MSJ`)
  render1(data)
});















































/*const form = document.getElementById(`form`);
const nombre = document.getElementById(`name`);
const precio = document.getElementById(`precio`);

form.addEventListener(`submit`, (ev) =>{
    ev.preventDefault();

    const item = {
        title: nombre.value,
        precio: precio.value
    };

    nombre.value= ``;
    precio.value= ``;

    socket.emit(`message`, item);
});

const render = ((data)=> {
  const html = data.map((e)=> {
    return(`<table>
      <tr>
        <th>Nombre</th>
        <th>Precio</th>
      </tr>
      <tr>
        <td>${e.nombre}</td>
        <td>${e.precio}</td>
      </tr>
    </table>`)
  }).join(" ");
})

socket.on(`response`, (data)=> {
  alert(JSON.stringify(data))
  //{render(data)};
});*/

