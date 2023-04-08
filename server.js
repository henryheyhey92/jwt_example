const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());
//enable CORS
app.use(cors());

const posts = [
    {
        username: 'Alan',
        title: "post 1"
    },
    {
        username: 'Max',
        title: "post 2"
    }
]

app.get('/posts', (req, res) => {
    res.json(posts);
})

app.post('/login', (req, res) => {
    //Authenticate user
    const username = req.body.username;
    const user = { name : username}
    console.log("🚀 ~ file: server.js:28 ~ app.get ~ username:", username)

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken});
})

app.listen(3000)