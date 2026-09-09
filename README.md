# CRUD de Libros con Spring Boot GraphQL, PostgreSQL y Angular

Proyecto full stack de ejemplo para administrar un catálogo de libros mediante **GraphQL**, con backend en **Spring Boot**, persistencia en **PostgreSQL** y cliente web desarrollado con **Angular**.

El repositorio muestra una implementación completa de consultas y mutaciones GraphQL para crear, listar, actualizar y eliminar libros desde una interfaz Angular.

## Tecnologías

- Java 17
- Spring Boot 3.5.3
- Spring for GraphQL
- Spring Data JPA
- PostgreSQL 17
- Maven
- Docker / Docker Compose
- Angular 19.2
- TypeScript 5.7
- RxJS

## Estructura del repositorio

```text
.
├── crud/             # Backend Spring Boot + GraphQL + PostgreSQL
└── cliente-angular/  # Frontend Angular
```

## Backend GraphQL

El backend expone el endpoint GraphQL estándar de Spring:

```text
http://localhost:8080/graphql
```

El esquema permite trabajar con libros mediante operaciones GraphQL como:

```graphql
query {
  libros {
    id
    titulo
    autor
    anio
  }
}
```

Y mutaciones para crear, actualizar y eliminar registros.

## Ejecutar con Docker Compose

El backend incluye un `compose.yml` con PostgreSQL y la API.

```bash
cd crud
docker compose up --build
```

La configuración usa:

- Base de datos: `graphql_crud`
- PostgreSQL: puerto `5432`
- API GraphQL: puerto `8080`

## Ejecutar el backend con Maven

Si prefieres ejecutar solamente PostgreSQL en Docker y Spring Boot localmente:

```bash
cd crud
mvn spring-boot:run
```

Para generar el JAR:

```bash
mvn clean package
java -jar target/spring-graphql-crud-1.0.0.jar
```

## Cliente Angular

El frontend consume `/graphql` mediante `HttpClient` y ejecuta queries y mutations desde el navegador.

```bash
cd cliente-angular
npm install
npm start
```

Después abre:

```text
http://localhost:4200
```

## Funcionalidades

- Listar libros con GraphQL Query
- Crear libros mediante GraphQL Mutation
- Actualizar libros
- Eliminar libros
- Persistencia en PostgreSQL
- Interfaz Angular
- Formularios y validación
- Docker Compose para ejecución local

## Organización del código

El backend contiene el esquema GraphQL, entidades JPA, repositorios, servicios y resolvers/controllers necesarios para manejar las operaciones del catálogo.

El cliente Angular está separado del backend para mostrar una arquitectura full stack donde GraphQL funciona como capa de comunicación entre ambos proyectos.

## Objetivo del proyecto

Servir como ejemplo práctico de un **CRUD GraphQL con Spring Boot, PostgreSQL y Angular**, útil para estudiar Spring for GraphQL, queries, mutations, JPA y consumo de GraphQL desde Angular.

## Temas relacionados

Spring Boot, Spring GraphQL, GraphQL, PostgreSQL, Spring Data JPA, Angular, Java, TypeScript, CRUD, queries, mutations, Docker, Maven, desarrollo full stack.
