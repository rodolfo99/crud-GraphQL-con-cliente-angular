package mx.com.ejemplo.graphql.controller;

import java.util.List;
import mx.com.ejemplo.graphql.dto.LibroInput;
import mx.com.ejemplo.graphql.model.Libro;
import mx.com.ejemplo.graphql.service.LibroService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class LibroGraphqlController {
    private final LibroService service;

    public LibroGraphqlController(LibroService service) { this.service = service; }

    @QueryMapping
    public List<Libro> libros() { return service.listar(); }

    @QueryMapping
    public Libro libro(@Argument Long id) { return service.buscar(id); }

    @MutationMapping
    public Libro crearLibro(@Argument LibroInput input) { return service.crear(input); }

    @MutationMapping
    public Libro actualizarLibro(@Argument Long id, @Argument LibroInput input) {
        return service.actualizar(id, input);
    }

    @MutationMapping
    public boolean eliminarLibro(@Argument Long id) { return service.eliminar(id); }
}
