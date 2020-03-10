const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const database = {
    users: [
        {
            id: '1',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req,res) => {
    res.send(database.users)
})

app.post('/signin', (req,res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0])
    }
    else {
        res.status(400).json('Error Logging in!')
    }
})

app.post('/register', (req,res) => {
    const {email, name, password} = req.body;
    database.users.push({
        id: '3',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    let found = false;
    database.users.map(user => {
        if (user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if (!found){
        return res.status(404).json('User Not Found!');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.map(user => {
        if (user.id === id){
            found = true;
            user.entries++;
            return res.json(user);
        }
    })
    if (!found){
        return res.status(404).json('User Not Found!');
    }
})

app.listen(3000, () => {
    console.log("Its working!")
})
