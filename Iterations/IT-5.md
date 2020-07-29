--Encuentra un lavandero

sergio@sergio.com
sergio2@sergio.com
sergio3@sergio.com
sergio4@sergio.com
sergio5@sergio.com

1. Creo 5 usuarios diferentes, 3 de ellos lavanderos.
2. Para que los usuarios vean la lista de lavanderos, haremos que visiten la página de lavanderos, es decir,
   añadir una ruta para /launderers en routes/laundry.js
3. Añado un router.get para la URL /launderers que
   3.1. Usa un find method sobre User para buscar si la sesión del user es lavandero
   3.2. Si hay un error, next y error.
   3.3. Si pasa, renderiza la plantilla views/laundry/launderers
   3.4. Paso los resultados de la DB bajo la variable "launderers"
   3.5. En launderers.hbs, utilizo la variable "launderers" para mostrar info.
