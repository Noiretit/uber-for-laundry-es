"npm install" para instalar todas las dependencias

"npm run dev" para ejecutar nodemon

https://github.com/Noiretit/uber-for-laundry-es/blob/master/docs/01-sign-up.md

1. Creo "auth.js" en la carpeta "routes"
2. En App.js
   2.1. Requiero la routes/auth.js en la variable authRouter y el "app.use" para definir que se usará en "/"

3. En routes/auth.js
   3.1. Requiero express.
   3.2. REequiero el router
   3.3. Creo un router.get /signup para renderizar el hbs "auth/signup" con un errorMessage vacío.
   3.4. Exporto el router al final del documento

4. "npm install --save bcrypt" para instalar el encriptador

5. En routes/auth.js
   5.1. Requiero bcrypt y creo las rounds de salt en bcryptSalt.
   5.2. Requiero el modelo User.
   5.3. Creo el router.post de /signup
   5.4. Traigo los valores de los inputs.
   5.5. Creo un condicional de que si los campos están vacíos, renderizar la página de nuevo y lanzar un error.
   5.6. Utilizo un findOne usando el modelo para encontrar si hay uno ya registrado
   5.7. Si algo sale mal, lanza un error.
   5.8. Si existe, renderizo de nuevo el signup y lanzo un error de "user ya existente"
   5.9. Si pasa los filtros:
   5.9.1. Guardo en variables la salt y el hashedPAss
   5.9.2. Creo el usuario y redirigo a login.
