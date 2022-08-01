const {httpServer} = require(`./services/server`)
const {initMongoDB} = require(`./services/db`)
require('dotenv').config()

const init = async () => {
    await initMongoDB();
    const puerto = process.env.PORT || 8080

    httpServer.listen(puerto, ()=> console.log(`SERVER UP EN ${puerto}`))
};

init();



