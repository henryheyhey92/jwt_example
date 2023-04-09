const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());
//enable CORS
app.use(cors());

let refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
    })
})

app.post('/login', (req, res) => {
    //Authenticate user
    const username = req.body.username;
    const user = { name : username}
    console.log("🚀 ~ file: server.js:28 ~ app.get ~ username:", username)
    const accessToken = generateAccessToken(user);
    // no expiry date for the refresh token
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken);
    res.json({accessToken: accessToken, refreshToken: refreshToken});
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s'})
}

app.listen(4000, function () {
    console.log("Server 2 has started")
})