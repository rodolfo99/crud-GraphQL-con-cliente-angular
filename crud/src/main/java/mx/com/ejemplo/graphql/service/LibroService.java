package mx.com.ejemplo.graphql.service;

import java.util.List;
import mx.com.ejemplo.graphql.dto.LibroInput;
import mx.com.ejemplo.graphql.model.Libro;
import mx.com.ejemplo.graphql.repository.LibroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LibroService {
    private final LibroRepository repository;

    public LibroService(LibroRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<Libro> listar() { return repository.findAll(); }

    @Transactional(readOnly = true)
    public Libro buscar(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("No existe el libro con id " + id));
    }

    public Libro crear(LibroInput input) {
        validar(input);
        return repository.save(new Libro(input.titulo().trim(), input.autor().trim(), input.anio()));
    }

    public Libro actualizar(Long id, LibroInput input) {
        validar(input);
        Libro libro = buscar(id);
        libro.setTitulo(input.titulo().trim());
        libro.setAutor(input.autor().trim());
        libro.setAnio(input.anio());
        return repository.save(libro);
    }

    public boolean eliminar(Long id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }

    private void validar(LibroInput input) {
        if (input == null || input.titulo() == null || input.titulo().isBlank())
            throw new IllegalArgumentException("El título es obligatorio");
        if (input.autor() == null || input.autor().isBlank())
            throw new IllegalArgumentException("El autor es obligatorio");
        if (input.anio() == null || input.anio() < 0)
            throw new IllegalArgumentException("El año debe ser un número positivo");
    }
}
