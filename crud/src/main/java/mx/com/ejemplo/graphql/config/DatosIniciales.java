package mx.com.ejemplo.graphql.config;

import mx.com.ejemplo.graphql.model.Libro;
import mx.com.ejemplo.graphql.repository.LibroRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatosIniciales {
    @Bean
    CommandLineRunner cargarDatos(LibroRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Libro("Effective Java", "Joshua Bloch", 2018));
                repository.save(new Libro("Clean Code", "Robert C. Martin", 2008));
            }
        };
    }
}
