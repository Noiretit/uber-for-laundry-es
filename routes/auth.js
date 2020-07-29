const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/user')

const router = express.Router(); //método router de Express
const saltRounds = 10;

//Ruta get/signup ===> renderiza el formulario signup

//Ruta post/signup ===> recoge los datos del formulario y crea el user en la DB
router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs', {
        errorMessage: ''
    }) //Pasamos un errorMessage por si queremos enseñar un error cuando hayan problemas con el signup
    return //Salimos de aquí para que no renderice el código
})

router.post('/signup', (req, res, next) => {
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

module.exports = router; //Exporta las rutas