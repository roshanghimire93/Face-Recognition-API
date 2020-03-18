const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/sigin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT

//connecting to the postgres database using knexjs
const knex = require('knex')({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req,res) => {
    knex.select('*').from('users')
    .then(users => res.send(users))
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, knex, bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req, res, knex, bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfile(req, res, knex)})

app.put('/image', (req, res) => {image.handleImage(req, res, knex)})

app.post('/imageurl', (req, res) => {image.handleAPI(req, res)})

app.listen(PORT, () => {
    console.log(`Its working on port: ${PORT}`)
})