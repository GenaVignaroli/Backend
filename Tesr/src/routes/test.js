const express = require (`express`);
const {axiosTest} = require (`../test/axios`)

const router = express.Router();

router.get(`/axios`,(req, res) => {
    res.json({
      data: axiosTest(),
    });
})

module.exports = router;