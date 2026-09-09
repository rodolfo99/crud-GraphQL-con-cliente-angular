# CRUD Spring Boot + GraphQL + PostgreSQL

Proyecto de ejemplo con Java 17, Spring Boot 3.5.3, Spring for GraphQL, Spring Data JPA, PostgreSQL y Docker Compose.

## Ejecutar todo con Docker

Requisitos: Docker con el complemento Compose.

```bash
docker compose up --build
```

Después abre GraphiQL en <http://localhost:8080/graphiql>.

Para detenerlo:

```bash
docker compose down
```

Para detenerlo y borrar también la base de datos:

```bash
docker compose down -v
```

## Ejecutar desde Maven

Primero inicia solamente PostgreSQL:

```bash
docker compose up -d postgres
mvn spring-boot:run
```

También funciona con Java 21 o 25, aunque el proyecto compila para Java 17.

## Operaciones GraphQL

La URL del endpoint es `http://localhost:8080/graphql`. En `requests/libros.graphql` hay ejemplos completos.

Listar libros:

```graphql
query {
  libros { id titulo autor anio }
}
```

Crear un libro:

```graphql
mutation {
  crearLibro(input: {
    titulo: "Domain-Driven Design"
    autor: "Eric Evans"
    anio: 2003
  }) {
    id titulo autor anio
  }
}
```

Actualizar un libro:

```graphql
mutation {
  actualizarLibro(id: 1, input: {
    titulo: "Effective Java, tercera edición"
    autor: "Joshua Bloch"
    anio: 2018
  }) {
    id titulo autor anio
  }
}
```

Eliminar un libro:

```graphql
mutation {
  eliminarLibro(id: 1)
}
```

## Estructura

- `controller`: consultas y mutaciones GraphQL.
- `service`: reglas del CRUD y transacciones.
- `repository`: acceso a PostgreSQL con JPA.
- `model`: entidad `Libro`.
- `src/main/resources/graphql`: esquema GraphQL.
- `compose.yml`: API y PostgreSQL.
