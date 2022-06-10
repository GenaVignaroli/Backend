const options = {
    client: `sqlite3`,
    connection: {
        filename: "../DB/mydb.sqilte"
    },
    useNullAsDefault: true
}

module.exports = {
    options: options
}