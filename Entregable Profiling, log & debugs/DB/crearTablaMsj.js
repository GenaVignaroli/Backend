const {options} = require(`./options/sqlite3`);
const knex = require(`knex`)(options);


knex.schema.createTable(`mensajes`, table => {
    table.string(`user`).notNullable()
    table.string(`hora`).notNullable()
    table.string(`message`).notNullable()
})
    .then(() => console.log(`Tabla creada exitosamente`))
    .catch((err)=>{console.log(err);throw err})
    .finally(()=> {
        knex.destroy()
    });