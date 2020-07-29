--Programar una recogida con un lavandero

1. En laundry.js, añado un router.get para renderizar el perfil del lavandero
   1.1. La ruta get renderiza "launderer-profile.hbs" cuando el user clica encima de "schedule a pickup" que lleva a "launderers/:id", justo la ruta de este get.
   1.2. Este get usa el método findById para enseñar el perfil seleccionado y paso la variable local de la info de la DB.

2. En laundry.js, requiero el modelo de LaundryPickup
   2.1. Agrego una ruta post para recoger la información y postearla en la DB
   2.2. Guardo la información del pickup en una variable (la fecha, el ID del lavandero y el id del usuario que la pide)
   2.3. Creo una nueva instancia del modelo LaundryPickup
   2.4. Guardo la información de la neuva instancia en la DB
   2.5. Una vez guardado, redirijo al dashboard
   2.6. Si hay problemas, envío el error.

Líneas 76-80: crea una instancia del modelo LaundryPickup con las propiedades correctas.

Líneas 77-78: las propiedades pickupDate y launderer provienen del formulario. El input del launderer es una etiqueta <input> con type="hidden". ¡Comprueba el HTML!

Línea 79: toma nuevamente el \_id del usuario de la sesión.

Línea 84: llama al método modelo save() de Mongoose para guardar realmente la recogida en la base de datos.

Línea 90: si todo sale según lo planeado, redirige nuevamente al dashboard.
