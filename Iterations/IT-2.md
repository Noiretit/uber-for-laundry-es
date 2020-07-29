npm install --save express-session connect-mongo

1. En auth.js: creo la router.get /login y renderizo la vista auth/login
2. En app.js:
   2.1. requiero express-session y connect-mongo.
   2.2. agrego un middleware

3. En auth.js:
   3.1. Encuentro al usuario por el email
   3.2. Utilizo el compareSync() para comparar y verificar passwords
   3.3. Si todo funciona, me guarda la info en req.session

4. En index.hbs:
   4.1. Añado un if que solo los usuarios que están logeados PUEDEN VER
   4.2. una declaración if..else muestra algunos de los enlaces a usuarios registrados y otros a usuarios anónimos
