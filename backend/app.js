require('dotenv').config()
const Recomendacao = require('./models/recomendacao')
const express = require ('express');
const app = express();
app.use(express.json())
const cors = require('cors')
app.use(cors())

const mongoose = require('mongoose');

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_ADDRESS, MONGODB_DATABASE} = process.env

//app.use (bodyParser.json());

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.${MONGODB_ADDRESS}.mongodb.net/${MONGODB_DATABASE}?
retryWrites=true&w=majority`)
.then(() => {
   console.log("Conexão OK")
}).catch((e) => {
   console.log(e)
   console.log("Sem conexão, CASSETE!!!")
});

////Endpoint para buscar mensagens
// função que executa antes de a requisição ser atendida.
//Ela se encarrega de ajustar os cabeçalhos da resposta
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    next();
});
//GET localhost:3000/api/recomendacoes
    app.get('/api/recomendacoes:id', (req, res, next) => {
        findById(req.params.id).then(rec => {
        if (rec){
            res.status(200).json(rec)
        }
        else
        res.status(404).json({mensagem: "mensagem não encontrada"})
        })
    });


//Endpoint para a inserção de novas mensagens
    app.post('/api/recomendacoes', (req, res, next) => {
        console.log(req.body)
        const recomendacao = new Recomendacao ({
            texto: req.body.texto
        })
        //inserindo a mensagem na base
        recomendacao.save()
        .then(recomendacaoInserida => {
            console.log(recomendacao);
            res.status(201).json({
                mensagem: 'recomendação inserida',
                id: recomendacaoInserida._id
            })
        })
    });

//para que os dados sejam trazidos diretamente da base gerenciada pelo MongoDB

    app.delete ('/api/recomendacoes/:id', (req, res, next) => {
        Recomendacao: deleteOne({_id: req.params.id})
        .then((resultado) => {
        console.log (resultado);
        res.status(200).json({mensagem: 'Recomendação Inserida'});
        }); 
    });


module.exports = app;

//app.put("/api/recomendacoes/:id", (req, res, next) => {
//   const recomendacao = new Recomendacao({
//    _id: req.params.id,
//    texto: req.body.texto,
    
//});

//updateOne({_id: req.params.id}, recomendacao)
//.then ((resultado) => {
//console.log (resultado)
//});
//res.status(200).json({mensagem: 'Atualização realizada com sucesso'})
//});
   

//Cada modulo tem uma propriedade chamada 
//exports. Podemos atribuir a ela valores que
//desejamos que fiquem disponíveis para 
//outros módulos. Neste caso vamos atribuir 
