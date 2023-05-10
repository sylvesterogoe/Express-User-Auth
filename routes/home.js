import express from 'express';
import verify from 'jsonwebtoken'

const homeRoute = express.Router();

homeRoute.get("/", verify, async (req, res, next) => {
    res.json({
        "Title": "Top Secret List",
        "Body": "You are chosen"
    })
})

export default homeRoute