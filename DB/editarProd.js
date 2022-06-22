const {options} = require(`./options/mariaDB`);
const knex = require(`knex`)(options);

const editaItem = (datos) => {
knex.from(`productos1`).update({datos})
    .then(()=> console.log(`Producto actualizado`))
    .catch((err)=>{console.log(err); throw err})
    .finally(()=> {
        knex.destroy()
    })
}

module.exports = {
    editaItem
}