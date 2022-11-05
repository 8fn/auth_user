const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');

users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashPassword);
        const user = {name: req.body.name, password: hashPassword}
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
   
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name);
    if(user == null){
        return res.status(400).send('Cannot find user')
    }
    try {
       if(await bcrypt.compare(req.body.password, user.password)){
        res.send('Success')
       } else {
        res.send('Not allowed')
       }
    } catch (error) {
        res.status(500).send()
    }
})
console.log('Server running!')
app.listen(3000, 'localhost')