//IT-4

const express = require('express');

const User = require('../models/user'); //Requiero el modelo User
const LaundryPickup = require('../models/laundry-pickup'); //IT-6, requiero el modelo laundry-pickup.js

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
    let query;

    if (req.session.currentUser.isLaunderer) {
        query = {
            launderer: req.session.currentUser._id
        };
    } else {
        query = {
            user: req.session.currentUser._id
        };
    }

    LaundryPickup
        .find(query)
        .populate('user', 'name')
        .populate('launderer', 'name')
        .sort('pickupDate')
        .then((pickupDocsDB) => {
            res.render('laundry/dashboard', {
                pickups: pickupDocsDB
            })
        })
        .catch((err) => {
            next(err)
        });
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
//RUTA CON CALLBACK
/*router.get('/launderers', (req, res, next) => {
    User.find({
        isLaunderer: true
    }, (err, laundererListDB) => {
        if (err) {
            next(err);
            return
        };

        res.render('laundry/launderers.hbs', {
            launderers: laundererListDB
        });
    });
});*/
//RUTA CON THEN-CATCH
router.get('/launderers', (req, res, next) => {
    User.find({
            $and: [{
                    isLaunderer: true
                },
                {
                    _id: {
                        $ne: req.session.currentUser._id
                    }
                }
            ]
        })
        .then(laundererListDB => {
            res.render('laundry/launderers.hbs', {
                launderers: laundererListDB
            })
        })
        .catch((err) => {
            next(err);
        })
})

//IT-6
router.get('/launderers/:id', (req, res, next) => {
    const laundererId = req.params.id;

    User.findById(laundererId)
        .then(theLaundererDB => {
            res.render('laundry/launderer-profile', {
                theLaunderer: theLaundererDB
            })
        })
        .catch((err) => {
            next(err);
        })
});

router.post('/laundry-pickups', (req, res, next) => {
    const pickupInfo = {
        pickupDate: req.body.pickupDate,
        launderer: req.body.laundererId,
        user: req.session.currentUser._id
    };

    const thePickup = new LaundryPickup(pickupInfo);

    thePickup
        .save()
        .then((newPickup) => {
            res.redirect('/dashboard');
        })
        .catch((err) => {
            console.log('Error while saving a pickup')
            next(err)
        });
})

module.exports = router;