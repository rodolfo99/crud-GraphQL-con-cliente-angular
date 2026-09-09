# Cliente Angular para CRUD GraphQL

Cliente web para el proyecto `spring-graphql-crud`. Incluye listado, alta, edición y eliminación de libros.

## Opción 1: desarrollo con Node.js

Primero inicia el backend en el puerto 8080. Después ejecuta:

```bash
npm install
npm start
```

Abre <http://localhost:4200>. El proxy de Angular reenvía `/graphql` a `http://localhost:8080`, por lo que no se necesita configurar CORS.

Requisitos: Node.js 22 y npm.

## Opción 2: cliente con Docker

Con el backend ejecutándose en el puerto 8080 del equipo anfitrión:

```bash
docker compose up --build
```

Abre <http://localhost:4200>. Nginx sirve Angular y reenvía `/graphql` al backend.

## Orden recomendado

1. En la carpeta del backend: `docker compose up --build`.
2. En esta carpeta: `npm install`.
3. En esta carpeta: `npm start`.
4. Abrir `http://localhost:4200`.

Si el puerto 4200 está ocupado, ejecuta `npm start -- --port 4300` y abre `http://localhost:4300`.
