const express = require("express")

const app = express()

const port = require("./config.json").port

app.use(express.static("./public"))

app.use('/api', require("./controller/controller"))

app.listen((process.env.PORT || port), err => {
    if (err) {
        console.error(err)
    } else {
        console.info(`Listening on ${port}`)
    }
})