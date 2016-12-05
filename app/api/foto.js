var mongoose = require('mongoose');
var model = mongoose.model('Foto');
var api = {};

api.lista = function(req, res) {
    model.find({})
        .then(function(fotos) {
            res.json(fotos);
        }, function(error) {
            console.log(error);
            res.status(500).json(error);
        });
};

api.buscaPorId = function(req, res) {
    model.findById(req.params.id)
        .then(function(foto) {
            if(!foto) {
                res.sendStatus(404);
            } else {
                res.json(foto);
            }
        }, function(error) {
            res.status(500).json(error);
        });
};

api.removePorId = function(req, res) {
    model.remove({_id : req.params.id})
        .then(function() {
            res.sendStatus(204);
        }, function(error) {
            res.status(500).json(error);
        });
};

api.adiciona = function(req, res) {
    model.create(req.body)
        .then(function(foto) {
            res.json(foto);
        }, function(error) {
            res.status(500).json(error);
        });
};

api.atualiza = function(req, res) {
    model.findByIdAndUpdate(req.params.id, req.body)
        .then(function(foto) {
            res.json(foto);
        }, function(error) {
            res.status(500).json(error);
        });
};

module.exports = api;