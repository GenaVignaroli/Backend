const {options} = require(`./options/mariaDB`);
const knex = require(`knex`)(options);
const {items} = require(`../src/server`)

knex(`productos`).insert(items)
    .then(()=> console.log(`Se cargaron los articulos`))
    .catch((err)=>{console.log(err);throw err})
    .finally(()=>{
        knex.destroy()
    })
