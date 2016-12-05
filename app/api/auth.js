module.exports = function(app) {
    var jwt = require('jsonwebtoken');

    var mongoose = require('mongoose');
    var Usuario = mongoose.model('Usuario');

    var api = {}

    api.autentica = function(req, res) {
        Usuario.findOne({login : req.body.login, senha : req.body.senha})
            .then(function(usuario) {
                if(!usuario) {
                    console.log('Login e senha inválidos');
                    res.sendStatus(401);
                } else {
                    var token = jwt.sign(usuario.login, app.get('secret'), {
                        expiresIn : 84600
                    });

                    console.log('Token criado e enviado no header da resposta');
                    res.set('x-access-token', token);
                    res.end();
                }
            }, function(error) {
                res.status(500).json(error);
            });
    };

    api.verificaToken = function(req, res, next) {
        var token = req.headers['x-access-token'];

        if(!token) {
            console.log('Token não foi enviado');
            res.sendStatus(401);
            return;
        }

        console.log('Verificando token...');
        jwt.verify(token, app.get('secret'), function(error, decoded) {
            if(error) {
                console.log('Token rejeitado');
                res.sendStatus(401);
                return;
            }

            req.usuario = decoded;
            next();
        });
    };

    return api;
};