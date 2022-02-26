# Proyecto Challenge: Social Rolling
 _Desarrollado por:_ 
 Walter Castillo, Comisión 27i  

:round_pushpin: El proyecto fue desarrollado integramente con HTML5, JAVASCRIPT PURO, CSS3.  

:round_pushpin: Usé Metodologia BEM para el nombrado de las clases para poder aplicar los estilos CSS.  

:round_pushpin: Elegí Grid para definir layout y complementé con  flexBox para alinear elementos.  

:round_pushpin: Apliqué Javascript ES6(Arrow Funtion, find, FindIndex, Modules).  

:round_pushpin: Usé la propagación de eventos y generar máximo dos eventos por nodos.  


## caracteristicas y flujo del proyecto 
Ingresamos en en la pagina principal [index.html](https://dazzling-tereshkova-cc9a5c.netlify.app/) donde nos aparece un alert con usuario y la contaseña, y se cargarán los datos del usuario en localStorage con la clave de "user" y las historias con la clave de "stories",
Podemos loguearnos o ingresar como invitado  

El formulario de login se validará mediante expresiones regulares cada vez  pulsamos una tecla o abadonamos el input.  

### Usuario logueado:  

- Puede ver las historias en un modal con intervelo de 3 segundo.  

- El modal se cierra después de la tercera historia o si se terminan o si lo cerramos desde la "x".  

- El usuario podra darle like indefinidamente en el modal o en la publicación en el "muro".  

- Podrá eliminar el Post desde el "muro".

- Cada vez que visitamos una historia, el círculo verde que la rodea cambiará a "blanco".

- El usuario haciendo click a su imagen de perfil puede cargar una historia nueva con un link externo  
  
- Si el link de la historia no es valido mostrará una imagen de "NO DISPONIBLE".  

### Usuario Invitado:  

- Igual que el usuario logueda, solamemte que no pude eliminar y cargar post.  

- El modal de historias se le mostrará con intervalo de 3seg y se cerrará caundo llegue al final y lo redirigirá a  [register.html](https://dazzling-tereshkova-cc9a5c.netlify.app/register.html)  y lo invitará  a registrarse, donde lo llevará a la página  [404.html](https://dazzling-tereshkova-cc9a5c.netlify.app/404.html) y desde ahí podrá volver al inicio.  


### caracaterísticas generales:

- cada vez que actualizamos la pagina o ingresamos de nuevo el localstorage volvera al estado inicial.

