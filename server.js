const express = require('express');
const app = express();
app.use(express.json())

users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', (req, res) => {
    const user = {name: req.body.name, password: req.body.password}
    users.push(user)
    res.status(201).send()
})

console.log('Server running!')
app.listen(3000, 'localhost')