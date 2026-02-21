# Practica: Buscador de Personajes de Star Wars (SWAPI)

Este proyecto es una aplicacion web en React y TypeScript que consume la API de Star Wars (SWAPI) para mostrar una lista paginada de personajes.

## Instalacion y Ejecucion

Para poder probar este proyecto, he seguido estos pasos:

1. **Instalar las dependencias generales:**
   npm install
   

2. **Instalar Axios (necesario para las peticiones a la API):**
   npm install axios
   `
3. **Añadir un .env:**
   A la hora de clonar mi repositorio, no funcionará ya que la url de la API se llama desde una variable de entorno para que no aparezca y sea secreto.

   Tendrás que añadir un .env y poner la url con este nombre: VITE_API_URL = XXXXXXXXXXXXX
   

4. **Arrancar el servidor:**
   npm run dev
   

## Explicacion del Proyecto

He decidido modularizar el codigo dividiendolo en varios componentes y archivos pequeños. He hecho esto principalmente por comodidad a la hora de saber donde puede fallar algo. Si hay un error, es mucho mas facil detectar los fallos aislando las partes (por ejemplo, si falla la vista de un personaje, voy directo al componente CharacterCard; si falla la peticion, voy a App.tsx o api.ts).

La estructura principal es la siguiente:
* **`src/types/character.ts`**: Define los tipos de los datos que recibimos de la API para aprovechar el tipado de TypeScript.
* **`src/api/api.ts`**: Contiene la configuracion de Axios y la conexion con las variables de entorno.
* **`src/App.tsx`**: Es el componente principal. Gestiona los estados mediante `useState` (`characters`, `loading`, `error`, `nextUrl`). 
  * **Uso de useEffect:** Utilizamos el hook `useEffect` con un array vacio (`[]`) para garantizar que la primera llamada a la API (`fetchCharacters()`) se ejecute una sola vez.
  * **Paginacion y acumulacion de datos:** Para cumplir con el requisito de acumular personajes en lugar de reemplazarlos, en la peticion leemos el valor del estado `nextUrl`. Al recibir la respuesta, utilizamos (`[...prev, ...e.data.results]`) para unir los personajes que ya teniamos en el estado con los nuevos que llegan. Ademas, actualizamos el estado `nextUrl` con el enlace a la pagina siguiente que nos devuelve la propia API (campo next), para que el boton sepa a donde llamar la proxima vez.
* **`src/components/CharacterList`**: Recibe el array de personajes por props y se encarga de iterarlos haciendo un map del componente individual para cada personaje.
* **`src/components/CharacterCard`**: Recibe un personaje individual por props y pinta su informacion.
* **`src/components/Loader` y `Error`**: Componentes visuales para manejar la página cuando la app esta cargando o tiene un error.

**Separacion de Estilos CSS:**
Ademas de separar la logica en componentes, he aplicado la misma idea a los estilos. Cada componente (menos Loader, ya que no lo veía necesario por no tener mucha relevancia en la aplicacion final) tiene su propio archivo `styles.css` (por ejemplo, `CharacterCard/styles.css` o `CharacterList/styles.css`). Hacerlo de esta manera me permite tener los estilos encapsulados, asegurando que el diseño de un componente no interfiera con el diseño de la aplicacion principal.

## Problemas Encontrados y Soluciones

Durante el desarrollo de la practica me encontre con varios problemas que pude ir solucionando:

1. **Variables de entorno en Vite:** Al principio, al ejecutar la aplicacion, no me funcionaba la llamada a la API. Tuve que revisar la grabacion de la clase y recordar que, al trabajar con Vite, es necesario poner el prefijo `VITE_` delante del nombre de la variable en el archivo `.env` (por ejemplo, `VITE_API_URL`).

2. **Error 404 por un error en la URL:**
   Tuve un problema porque el `fetch` de los personajes no funcionaba. Resulta que en mi archivo `.env` habia guardado la ruta como `https://swapi.dev/api/`. Como en `App.tsx` yo hacia la llamada añadiendo `/people/`, la URL resultante quedaba con dos barras (`https://swapi.dev/api//people/`), lo que provocaba un error 404 (Not Found). Lo solucione cambiando la variable de entorno a `https://swapi.dev/api` (sin la barra final), y dejo de dar problemas.

3. **Llamada doble a la API al inicio:**
   Me di cuenta de que, al iniciar la aplicacion, se hacia la peticion a la API dos veces. En ejercicios anteriores de clase no se daba importancia y nos lo va a explicar en el futuro, pero en esta app, al acumular personajes, el fallo se notaba bastante. Investigue y vi que el causante era el componente `<StrictMode>` que envuelve a `<App />` en el archivo `main.tsx`. Entendi que es un comportamiento normal en desarrollo para detectar errores.
