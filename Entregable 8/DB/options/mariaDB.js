const options = {
    client: `mysql`,
    connection: {
        host: `127.0.0.1`,
        user: `root`,
        password: ``, 
        database: `entregable8`
    },
    pool: { min:0, max:7}
}

module.exports = {options: options};