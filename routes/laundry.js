//IT-4

const express = require('express');

const User = require('../models/user'); //Requiero el modelo User

const router = express.Router();

//Middleware de acceso
router.use((req, res, next) => {
    if (req.session.currentUser) { //Si hay un user en sesión, continua con las rutas llamando a Next y retornando
        next();
        return;
    }
    //Si no hay user en sesión (anónimo), redirige a "log-in" cuando intenta entrar a dashboard.
    res.redirect('/login');
})

router.get('/dashboard', (req, res, next) => {
    res.render('laundry/dashboard');
});

router.post('/launderers', (req, res, next) => {
    const userId = req.session.currentUser._id; //Obtengo el _id del usuario de la sesión
    const laundererInfo = { //Preparo la info actualizada con el precio del formulario y hardcodeo el isLaunderer en true
        fee: req.body.fee,
        isLaunderer: true
    };

    User.findByIdAndUpdate(userId, laundererInfo, { //Actualizo el user con el ID X y le paso la info a actualizar
        new: true
    }, (err, theUser) => {
        if (err) {
            next(err);
            return;
        }
        req.session.currentUser = theUser;

        res.redirect('/dashboard');
    });
});

//IT-5
router.get('/launderers', (req, res, next) => {
    User.find({
        isLaunderer: true
    }, (err, laundererListDB) => {
        if (err) {
            next(err);
            return
        };

        res.render('laundry/launderers.hbs', {
            launderers: laundererListDB
        })
    })
})

module.exports = router;