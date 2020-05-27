# Prueba Intelligential

## ¿Como ejecutar los archivos?

### Prueba de algoritmo

Hay dos formas en que se puede probar la funcion.

1. Creando script.
    1. Se crea un script en el cual se importa el archivo y se asigna a una variable.
    ```
    const algorithm = require('./algorithm/index.js')
    ```
    2. Se crea una variable con el array a recorrer.
    ```
    const array_2_test = [[1,2,3],[4,5,6],[7,8,9]]
    ```
    3. Se ejecuta el la funcion y se comprueba el resultado
    ```
    const result = algorithm.caracol(array_2_test)
    console.log(result)
    ```
2. Agregando mas pruebas. Este algoritmo ya cuenta con un archivo de pruebas el cual se encuentra en la ruta **algorithm/caracol.test.js** se puede agregar mas pruebas siguiendo el formato del mismo, despues ejecurtarlas con el comando
    ```
    npm test
    ```

### Arquitectura

El archivo de la arquitectura se encuentra **architecture/architecture.jpg**.

### Caso practico

El caso practico se ejecuta facilmente escribiendo en la carpeta raiz de este repositorio el comando 
```
npm run run:practice
```
Es importante aclarar que se requiere tener instalado globalmente serve ya sea via npm o yarn
```
yarn add global serve
```
o 
```
npm i -g serve
```

La prueba ya cuenta con 2 usuarios agregados, un administrado y usuario normal, asi como un libro.

Para iniciar sesión:

Para el administrador
```
user:admin@mail.com
pass:admin123
```

Para el usuario
```
user:test@mail.com
pass:test123
```

## TODO

- [x] Add validations in backend
- [ ] Add error messages in frontend
- [ ] Add a select component when creating a new user
- [ ] Improve style
- [ ] Improve performance