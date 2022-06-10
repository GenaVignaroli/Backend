const {options} = require(`./options/mariaDB`);
const knex = require(`knex`)(options);


knex.schema.createTable(`productos1`, table => {
    table.string(`name`).notNullable()
    table.string(`price`).notNullable()
    table.string(`foto`).notNullable()
})
    .then(() => console.log(`Tabla creada exitosamente`))
    .catch((err)=>{console.log(err);throw err})
    .finally(()=> {
        knex.destroy()
    });