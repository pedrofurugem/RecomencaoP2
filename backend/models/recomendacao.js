const mongoose = require('mongoose')

const recomendacaoSchema = mongoose.Schema({
    texto: {type: String}
});

module.exports = mongoose.model('Recomendacao', recomendacaoSchema)