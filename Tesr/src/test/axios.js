const axios = require("axios");

const axiosTest = () => {
    axios
        .get("https://localhost:8080/api/productos")
        .then((res)=> {
            console.log(res.data);
        })
        .catch((err)=> {
            console.error(err.message);
        });
};

module.exports = {
    axiosTest,
}