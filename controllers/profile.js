const handleProfile = (req,res, knex) => {
    const { id } = req.params;
    let found = false;
    knex.select('*').from('users').where({id})
    .then(user => {
        if(user.length){
            res.send(user[0])
        }
        else{
            res.status(400).json('Profile not found!')
        }
    })
    .catch(response => res.status(400).json('Error getting user!'))
}

module.exports = {
    handleProfile: handleProfile
}