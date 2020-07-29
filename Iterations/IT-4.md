--Conviértete en un lavandero.

1. Creo laundry.js dentro de "routes"
2. En App.js
   2.1. Requiero la ruta laundry.js en la vairable "laundryRouter"
   2.2. Añado el app.use de "/" para laundryRouter

3. En laundry.js
   3.1. Requiero express y el router.
   3.2. Rut get para renderizar el laundry/dashboard.
   3.3. Exporto el router

4. En laundry.js
   4.1. Requiero el modelo User.
   4.2. Router.post del form /launderers
   4.3. Guardo el \_id de la sesión en una variable.
   4.4. Guardo en la info de lavandero el input de fee en una variable y hardcoreo que si es lavandero con "true".
   4.5. Utilizo el método findByIdAndUpdate y le paso el ID de la sessión, la info a actualizar, { new: true } para que muestre el nuevo y un callback.
   4.5.1. Si hay un error, next y return para salir de la ejecución.
   4.5.2. Actualiza la info de la sesión junto al new:true para obtener la información actualizada del usuario en el callback.
   4.5.3. Redirecciona al dashboard

5. en views/laundry/dashboard.hbs
   5.1. Actualizo el hbs para que el usuario pueda ver un comentario de éxito al convertirso el lavandero.

6. En routes/laundry.js añado:
   6.1. Un middleware para acceso a las rutas de lavandería.
   6.1.1. Si hay user logeado, deja ver el dashboard.
   6.1.2. Si no hay user logeado, redirije a log-in.
