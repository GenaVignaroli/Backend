const {options} = require(`./options/mariaDB`);
const knex = require(`knex`)(options);

const subirItem = (datos) => {
knex(`productos1`).insert(datos)
    .then(()=> console.log(`Se cargaron los articulos`))
    .catch((err)=>{console.log(err);throw err})
    .finally(()=>{
        knex.destroy()
    })
}

module.exports = {
    subirItem
}
