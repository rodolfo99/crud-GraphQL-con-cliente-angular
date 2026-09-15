# CRUD GraphQL de Libros — Spring Boot + PostgreSQL + Angular

> Aplicación **full stack en Java** para gestionar libros mediante **GraphQL**, con **Spring Boot**, **Spring for GraphQL**, **PostgreSQL**, **Angular** y **Docker Compose**.

![Java](https://img.shields.io/badge/Java-17-informational)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.3-informational)
![GraphQL](https://img.shields.io/badge/GraphQL-Spring-informational)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-informational)
![Angular](https://img.shields.io/badge/Angular-19.2-informational)

Este repositorio muestra una implementación completa de **GraphQL con Spring Boot**, persistencia con PostgreSQL y un cliente Angular. Incluye queries y mutations para administrar un catálogo de libros y sirve como referencia práctica para aprender Spring for GraphQL desde un ejemplo full stack pequeño y comprensible.

## Lo más importante

- Backend con Spring Boot y Spring for GraphQL.
- Queries y mutations GraphQL.
- Persistencia con Spring Data JPA y PostgreSQL.
- Cliente Angular separado del backend.
- CRUD completo de libros.
- Docker Compose para ejecutar la infraestructura localmente.
- Proyecto útil como punto de partida para APIs GraphQL en Java.

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

## Arquitectura

```text
Angular
   │ GraphQL queries / mutations
   ▼
Spring Boot + Spring for GraphQL
   │ Spring Data JPA
   ▼
PostgreSQL
```

## Estructura

```text
.
├── crud/             # Backend Spring Boot + GraphQL + PostgreSQL
└── cliente-angular/  # Frontend Angular
```

## Inicio rápido

### Con Docker Compose

```bash
cd crud
docker compose up --build
```

Servicios principales:

- PostgreSQL: puerto `5432`
- API GraphQL: `http://localhost:8080/graphql`

### Backend con Maven

```bash
cd crud
mvn spring-boot:run
```

Para generar el JAR:

```bash
mvn clean package
java -jar target/spring-graphql-crud-1.0.0.jar
```

### Cliente Angular

```bash
cd cliente-angular
npm install
npm start
```

Abre:

```text
http://localhost:4200
```

## Ejemplo GraphQL

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

El esquema también define mutations para crear, actualizar y eliminar registros.

## Funcionalidades

- Listar libros con GraphQL Query
- Crear libros mediante GraphQL Mutation
- Actualizar libros
- Eliminar libros
- Persistencia en PostgreSQL
- Interfaz Angular
- Formularios y validación
- Docker Compose

## Para qué sirve este proyecto

Es una referencia práctica para estudiar:

- **Spring for GraphQL**.
- Diseño de schemas GraphQL.
- Queries y mutations.
- Persistencia GraphQL + JPA + PostgreSQL.
- Consumo de GraphQL desde Angular.
- Arquitectura full stack Java moderna.

## Otros proyectos del mismo perfil

- [CRUD PostgreSQL REST + Angular](https://github.com/rodolfo99/CRUD-PstgreSQL-Libros-con-cliente-angular)
- [CRUD Apache Solr + Angular](https://github.com/rodolfo99/CRUD-Solr-con-cliente-angular)
- [CRUD Neo4j + Angular](https://github.com/rodolfo99/CRUD-LIBROS-NEO4J)
- [Spring Data GraphDB](https://github.com/rodolfo99/Spring-Data-GraphDB)
- [Marc2BF — MARC21 a BIBFRAME](https://github.com/rodolfo99/Marc2BF)

## Autor

**Rodolfo Valencia** — desarrollo de software, Java, Spring, Angular, bases de datos, tecnologías semánticas e inteligencia artificial.

GitHub: [@rodolfo99](https://github.com/rodolfo99)

## Temas relacionados

Spring Boot · Spring GraphQL · GraphQL · PostgreSQL · Spring Data JPA · Angular · Java · TypeScript · CRUD · queries · mutations · Docker · Maven · full stack
