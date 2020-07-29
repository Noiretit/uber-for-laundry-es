const express = require('express');
const bcrypt = require('bcrypt'); //IT-2
const User = require('./../models/user') //IT-1

const router = express.Router(); //método router de Express
const saltRounds = 10; //IT-2


router.get('/signup', (req, res, next) => { //IT-1
    res.render('auth/signup.hbs', {
        errorMessage: ''
    }) //Pasamos un errorMessage por si queremos enseñar un error cuando hayan problemas con el signup
    return //Salimos de aquí para que no renderice el código
})

router.post('/signup', (req, res, next) => { //IT-1
    const {
        name,
        email,
        password
    } = req.body;

    //Comprobar que los campos email y password no estén vacíos
    if (email === "" || password === "") {
        res.render('auth/signup.hbs', {
            errorMessage: "Enter both email and password"
        });
        return;
    };
    //Comprobar que no existe otro suuario con ese email
    User.findOne({
            email
        })
        .then((foundUser) => {
            if (foundUser) {
                res.render('auth/signup', {
                    errorMessage: `There's already an account with this email: ${email}`
                });
                return
            };

            //Si todo sale bien, encriptar password
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            //Guardar el user en DB

            User.create({
                    name,
                    email,
                    password: hashedPassword
                })
                .then(() => {
                    res.redirect('/login')
                })
                .catch((err) => {
                    res.render('auth/signup', {
                        errorMessage: "Error while creating account, please try again"
                    })
                })
        })
        .catch((err) => console.log(err))
})

router.get('/login', (req, res, next) => { //IT-2
    res.render('auth/login', {
        errorMessage: ''
    });
});

router.post('/login', (req, res, next) => { //IT-2
    const {
        email,
        password
    } = req.body;

    if (email === "" || password === "") {
        res.render('auth/login.hbs', {
            errorMessage: 'Enter both email and password to log-in'
        });
        return; //para que salga del router
    }

    User.findOne({
            email
        })
        .then((foundUser) => {
            if (!foundUser) {
                res.render('auth/login', {
                    errorMessage: `There isn't an account with email ${email}.`
                });
                return;
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                res.render('auth/login', {
                    errorMessage: 'Invalid password'
                });
                return;
            }
            req.session.currentUser = foundUser;
            res.redirect('/');
        })
});

module.exports = router; //Exporta las rutas