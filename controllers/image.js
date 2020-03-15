const handleImage = (req, res, knex) => {
        const { id } = req.body;
        knex('users').where({id})
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.send(entries[0])
        })
        .catch(err => res.status(400).json('Unable to get entries!'))
}

module.exports = {
    handleImage: handleImage
}