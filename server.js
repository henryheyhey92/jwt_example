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

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
})

app.post('/login', (req, res) => {
    //Authenticate user
    const username = req.body.username;
    const user = { name : username}
    console.log("🚀 ~ file: server.js:28 ~ app.get ~ username:", username)

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken});
})

//middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log("🚀 ~ file: server.js:43 ~ jwt.verify ~ user:", user)
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

app.listen(3000, function () {
    console.log("Server has started")
})