const express = require (`express`);
const path = require ( `path`);
const mainRouter = require(`./routes/index`);

const app = express()
const puerto = 8080;
const server = app.listen(puerto, () => 
    console.log(`Server up en puerto`, puerto)
);

server.on(`error`, (err) => { 
    console.log(`ERROR ATAJADO`, err);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const publicPath = path.resolve(__dirname, `../public`);
app.use(express.static(publicPath));

app.use(`/api`, mainRouter); 