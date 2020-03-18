const handleRegister = (req,res, knex, bcrypt) => {
    const {email, name, password} = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const duplicateEmail = (userEmail) => {
        return knex.select('*').from('users').where('email','=', userEmail.toLowerCase())
        .then (user => {console.log((user[0]))})
    }

    if(duplicateEmail(email)){
        return res.send(duplicateEmail(email))
    }

    if (!email || !password || !name ){
        return res.status(400).json("Incorrect form submission!")
    }
    if (!ValidateEmail(email.toLowerCase())){
        return res.status(400).json("Invalid email!")
    }

    knex.transaction(trx => {
        knex.insert({
            email: email.toLowerCase(),
            hash: hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users').returning('*').insert({
                name: name.toLowerCase(),
                email: loginEmail[0].toLowerCase(),
                joined: new Date()
            })
            .then(user => {
                res.json(user);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to Register!'));

}

const ValidateEmail = (mail) =>
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

module.exports = {
    handleRegister: handleRegister
}