import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';
import { TuiActiveZone } from '@taiga-ui/cdk/directives/active-zone';
import { TuiIcon, TuiInputDirective, TuiLoader, tuiLoaderOptionsProvider, TuiNumberFormat, TuiNumberFormatSettings, TuiTextfield, tuiTextfieldOptionsProvider } from '@taiga-ui/core';
import { TuiFluidTypography, TuiInputNumber, TuiStepper, TuiTiles, TuiToastService } from '@taiga-ui/kit';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Producto } from '../models/programas.model';
import { ProgramasService } from '../services/programas.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TuiTiles,
    TuiIcon,
    TuiInputDirective,
    TuiActiveZone,
    TuiLoader, TuiStepper, TuiNumberFormat, TuiTextfield, TuiFluidTypography, FormsModule, CommonModule, TuiCurrencyPipe, TuiInputNumber],
  templateUrl: './home.html',
  styleUrls: ['./home.less'],
  providers: [
    tuiTextfieldOptionsProvider({
      cleaner: signal(false), // Oculta el botón de borrar
    }),
    tuiLoaderOptionsProvider({ size: 'xl' })
  ],
})

export class Home implements OnInit {
  private readonly programas = inject(ProgramasService);
  private readonly toast = inject(TuiToastService);
  protected numberFormat: Partial<TuiNumberFormatSettings> = {
    decimalSeparator: ',',
    thousandSeparator: '.',
  };
  protected items: Producto[] | null = null;

  protected order = new Map();

  ngOnInit(): void {
    this.programas.obtenerTodos().subscribe((programas) => {
      if (programas.length > 0) {
        const primerPrograma = programas[programas.length - 1];
        this.items = primerPrograma.productos;
        this.order = primerPrograma.order;
      }
    });
  }

  // Escucha el evento 'paste' en la ventana del navegador
  onPaste(event: ClipboardEvent, currentItemIndex: number): void {
    if (this.items) {
      this.items[currentItemIndex].loadingImage = true;
      const clipboardData = event.clipboardData;
      if (!clipboardData) {
        this.items[currentItemIndex].loadingImage = false;
        this.mostrarToastImagenInvalida();
        return;
      }

      // 1. Intentar leer si lo que se pegó es un texto/URL
      const pastedText = clipboardData.getData('text');
      if (pastedText && this.items[currentItemIndex].image !== pastedText && this.esUrlValida(pastedText)) {
        this.items[currentItemIndex].image = pastedText;
        return;
      } else {
        this.mostrarToastImagenInvalida();
        this.items[currentItemIndex].loadingImage = false;
      }
    }
  }

  mostrarToastImagenInvalida() {
    this.toast
      .open('Imagen inválida', {
        autoClose: 5000,
        data: '@tui.image-off',
      })
      .subscribe();
  }

  // Validación básica para comprobar si el texto tiene formato de URL
  private esUrlValida(texto: string): boolean {
    return texto.startsWith('http://') || texto.startsWith('https://');
  }

  onImagenCargada(currentItemIndex: number) {
    if (this.items) {
      this.items[currentItemIndex].loadingImage = false;
    }
  }

  onErrorImagen(currentItemIndex: number) {
    if (this.items) {
      this.items[currentItemIndex].loadingImage = false;
      this.items[currentItemIndex].image = null;
    }
    this.mostrarToastImagenInvalida();
  }

  protected onParentActiveZone(active: boolean, currentItemIndex: number): void {
    if (this.items) {
      this.items[currentItemIndex].copiadoActivo = active;
    }
  }
}
