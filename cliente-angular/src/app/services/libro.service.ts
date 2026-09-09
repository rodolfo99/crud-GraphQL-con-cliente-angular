import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Libro, LibroInput } from '../models/libro';

interface GraphqlError { message: string; }
interface GraphqlResponse<T> { data?: T; errors?: GraphqlError[]; }

@Injectable({ providedIn: 'root' })
export class LibroService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/graphql';

  listar(): Observable<Libro[]> {
    return this.execute<{ libros: Libro[] }>(`
      query { libros { id titulo autor anio } }
    `).pipe(map(data => data.libros));
  }

  crear(input: LibroInput): Observable<Libro> {
    return this.execute<{ crearLibro: Libro }>(`
      mutation Crear($input: LibroInput!) {
        crearLibro(input: $input) { id titulo autor anio }
      }
    `, { input }).pipe(map(data => data.crearLibro));
  }

  actualizar(id: string, input: LibroInput): Observable<Libro> {
    return this.execute<{ actualizarLibro: Libro }>(`
      mutation Actualizar($id: ID!, $input: LibroInput!) {
        actualizarLibro(id: $id, input: $input) { id titulo autor anio }
      }
    `, { id, input }).pipe(map(data => data.actualizarLibro));
  }

  eliminar(id: string): Observable<boolean> {
    return this.execute<{ eliminarLibro: boolean }>(`
      mutation Eliminar($id: ID!) { eliminarLibro(id: $id) }
    `, { id }).pipe(map(data => data.eliminarLibro));
  }

  private execute<T>(query: string, variables: Record<string, unknown> = {}): Observable<T> {
    return this.http.post<GraphqlResponse<T>>(this.endpoint, { query, variables }).pipe(
      map(response => {
        if (response.errors?.length) {
          throw new Error(response.errors.map(error => error.message).join('\n'));
        }
        if (!response.data) throw new Error('El servidor GraphQL no devolvió datos');
        return response.data;
      })
    );
  }
}
