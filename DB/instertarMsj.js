const {options} = require(`./options/sqlite3`);
const knex = require(`knex`)(options);

const subirMsj = (datos) => {
    knex(`mensajes`).insert(datos)
        .then(()=> console.log(`Se cargaron los mensajes`))
        .catch((err)=>{console.log(err);throw err})
        .finally(()=>{
            knex.destroy()
        })
    }
    
    module.exports = {
        subirMsj
    }