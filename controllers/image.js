const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/
//initialized the face detection API with the apiKey
const app = new Clarifai.App({
    apiKey: '00513f0e128947d585f3d6e09d54598a'
   });

const handleAPI = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Unable to work with API'))
}

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
    handleImage: handleImage,
    handleAPI: handleAPI
}