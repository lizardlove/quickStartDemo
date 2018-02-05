import express from "express"

const router = express()

router.get("/", (req, res) => {
    res.send("fuck you")
})

module.exports = router