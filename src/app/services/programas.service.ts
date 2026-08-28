import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, of, switchMap } from 'rxjs';
import { Programa } from '../models/programas.model';
import { programaDemo } from '../home/mocks/demo.mock';

/**
 * Servicio genérico para consumir recursos REST desde Angular.
 * @template T Tipo de la entidad gestionada.
 */
@Injectable({
    providedIn: 'root',
})
export class ProgramasService<T> {
    private readonly storage = inject(StorageMap);

    obtenerTodos(): Observable<Programa[]> {
        return this.storage.get('programas').pipe(
            // Si no hay datos en el almacenamiento local, devuelve listado demo
            switchMap((datosAlmacenados: any) => {
                if (datosAlmacenados) {
                    return of(datosAlmacenados);
                } else {
                    const programasDemo: Programa[] = [programaDemo];
                    this.storage.set('programas', programasDemo).subscribe();
                    return of(programasDemo);
                }
            })
        );
    }

    obtenerPorId(id: string | number): Observable<Programa | null> {
        return this.obtenerTodos().pipe(
            switchMap((programas: Programa[]) => {
                const programa = programas.find(p => p.id === id);
                if (programa) {
                    return of(programa as Programa);
                } else {
                    return of(null);
                }
            })
        );
    }

    // crear(): Observable<Programa> {
    //     return this.obtenerTodos().pipe(
    //         switchMap((programas: Programa[]) => {
    //             const nuevoId = programas.length > 0 ? Math.max(...programas.map(p => p.id)) + 1 : 1;
    //             const nuevoPrograma: Programa = { programaNuevo, id: nuevoId } as unknown as Programa;
    //             const programasActualizados = [...programas, nuevoPrograma];
    //             this.storage.set('programas', programasActualizados).subscribe();
    //             return of(nuevoPrograma);
    //         })
    //     );
    // }

    // actualizar(id: string | number, entidad: Partial<T>): Observable<T> {
    //     return this.http.put<T>(`${this.endpoint}/${id}`, entidad);
    // }

    // eliminar(id: string | number): Observable<void> {
    //     return this.http.delete<void>(`${this.endpoint}/${id}`);
    // }
}
