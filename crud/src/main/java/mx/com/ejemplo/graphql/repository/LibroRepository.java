package mx.com.ejemplo.graphql.repository;

import mx.com.ejemplo.graphql.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibroRepository extends JpaRepository<Libro, Long> {}
