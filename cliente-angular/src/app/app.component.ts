import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Libro, LibroInput } from './models/libro';
import { LibroService } from './services/libro.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(LibroService);

  readonly libros = signal<Libro[]>([]);
  readonly editandoId = signal<string | null>(null);
  readonly cargando = signal(false);
  readonly guardando = signal(false);
  readonly eliminandoId = signal<string | null>(null);
  readonly mensaje = signal('');
  readonly error = signal('');

  readonly formulario = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.maxLength(255)]],
    autor: ['', [Validators.required, Validators.maxLength(255)]],
    anio: [new Date().getFullYear(), [Validators.required, Validators.min(0), Validators.max(9999)]]
  });

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.cargando.set(true);
    this.error.set('');
    this.service.listar().pipe(finalize(() => this.cargando.set(false))).subscribe({
      next: libros => this.libros.set(libros),
      error: error => this.mostrarError(error)
    });
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.guardando.set(true);
    this.limpiarAvisos();
    const input: LibroInput = this.formulario.getRawValue();
    const id = this.editandoId();
    const operacion = id ? this.service.actualizar(id, input) : this.service.crear(input);

    operacion.pipe(finalize(() => this.guardando.set(false))).subscribe({
      next: libro => {
        this.libros.update(actuales => id
          ? actuales.map(item => item.id === libro.id ? libro : item)
          : [...actuales, libro]);
        this.mensaje.set(id ? 'Libro actualizado correctamente.' : 'Libro creado correctamente.');
        this.cancelarEdicion();
      },
      error: error => this.mostrarError(error)
    });
  }

  editar(libro: Libro): void {
    this.limpiarAvisos();
    this.editandoId.set(libro.id);
    this.formulario.setValue({ titulo: libro.titulo, autor: libro.autor, anio: libro.anio });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicion(): void {
    this.editandoId.set(null);
    this.formulario.reset({ titulo: '', autor: '', anio: new Date().getFullYear() });
  }

  eliminar(libro: Libro): void {
    if (!confirm(`¿Eliminar “${libro.titulo}”?`)) return;
    this.eliminandoId.set(libro.id);
    this.limpiarAvisos();
    this.service.eliminar(libro.id).pipe(finalize(() => this.eliminandoId.set(null))).subscribe({
      next: eliminado => {
        if (!eliminado) {
          this.error.set('El libro ya no existe. Se actualizará la lista.');
          this.cargar();
          return;
        }
        this.libros.update(actuales => actuales.filter(item => item.id !== libro.id));
        if (this.editandoId() === libro.id) this.cancelarEdicion();
        this.mensaje.set('Libro eliminado correctamente.');
      },
      error: error => this.mostrarError(error)
    });
  }

  private limpiarAvisos(): void { this.mensaje.set(''); this.error.set(''); }
  private mostrarError(error: unknown): void {
    const mensaje = error instanceof Error ? error.message : 'No fue posible conectar con el servidor.';
    this.error.set(mensaje);
  }
}
