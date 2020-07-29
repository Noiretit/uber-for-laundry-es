--Pickups pendientes

En laundry.js

1. Modifico el router.get de dashboard.
   1.1. Declaro una variable query vacía.
   1.2. Creo un condicional que dependiendo de si el user es lavandero o no, guarda la información en la variable "query"
   1.2.1. Linea 24: si la sesión conectada es un lavandero, guarda en query el ID del lavandero.
   1.2.2. Linea 26: si la sesión conectada es un user, guarda en query el ID del user.
   1.3.
