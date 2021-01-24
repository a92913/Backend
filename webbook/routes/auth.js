//rotas de autenticação
//exportar todas as rotas criadas

const authController = require('../controllers/auth.controller.js');
module.exports = function(app, passport) {
    //rota de registo
    app.get('/signup', authController.signup);
    //rota de login
    app.get('/signin', authController.signin);
    app.get('/signupSuccess', authController.signupSuccess);
    app.get('/signinSuccess', authController.signinSuccess);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/signupSuccess',
        failureRedirect: '/signup'
    }));
    //rota de logout
    app.get('/logout', authController.logout);
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/signinSuccess',
        failureRedirect: '/signin'
    }));
    app.get("/profile", passport.authenticate("cookie", {
        function(req, res) {
            res.json(req.user);
        }
        }));
    //para verificar se o utilizador está autenticado
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        // res.redirect('/signin');
    }
};
