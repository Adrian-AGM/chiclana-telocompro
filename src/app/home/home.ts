import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';
import { TuiActiveZone } from '@taiga-ui/cdk/directives/active-zone';
import { TuiIcon, TuiInputDirective, TuiLoader, tuiLoaderOptionsProvider, TuiNumberFormat, TuiNumberFormatSettings, TuiTextfield, tuiTextfieldOptionsProvider } from '@taiga-ui/core';
import { TuiFluidTypography, TuiInputNumber, TuiStepper, TuiTiles } from '@taiga-ui/kit';

interface Product {
  owner: string,
  baseColor: string,
  accentColor: string,
  product: string | null,
  loadingImage: boolean,
  image: string | null,
  copiadoActivo: boolean,
  price: string | null
}

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

export class Home {
  protected numberFormat: Partial<TuiNumberFormatSettings> = {
    decimalSeparator: ',',
    thousandSeparator: '.',
  };
  protected items: Product[] = [
    { owner: 'PEP', baseColor: '#FF9966', accentColor: '#FFF500', product: null, copiadoActivo: false, loadingImage: false, image: null, price: null },
    { owner: 'PUI', baseColor: '#5AA7F7', accentColor: '#FF9966', product: null, copiadoActivo: false, loadingImage: false, image: null, price: null },
    { owner: 'JAVIER', baseColor: '#FFF500', accentColor: '#5AA7F7', product: null, copiadoActivo: false, loadingImage: false, image: null, price: null },
  ];

  protected order = new Map();

  // Escucha el evento 'paste' en la ventana del navegador
  onPaste(event: ClipboardEvent, currentItemIndex: number): void {
    this.items[currentItemIndex].loadingImage = true;
    const clipboardData = event.clipboardData;
    if (!clipboardData) {
      this.items[currentItemIndex].loadingImage = false;
      return;
    }

    // 1. Intentar leer si lo que se pegó es un texto/URL
    const pastedText = clipboardData.getData('text');
    if (pastedText && this.items[currentItemIndex].image !== pastedText && this.esUrlValida(pastedText)) {
      this.items[currentItemIndex].image = pastedText;
      return;
    } else {
      this.items[currentItemIndex].loadingImage = false;
    }
  }

  // Validación básica para comprobar si el texto tiene formato de URL
  private esUrlValida(texto: string): boolean {
    return texto.startsWith('http://') || texto.startsWith('https://');
  }

  onImagenCargada(currentItemIndex: number) {
    this.items[currentItemIndex].loadingImage = false;
  }

  protected onParentActiveZone(active: boolean, currentItemIndex: number): void {
    console.log(active);
    this.items[currentItemIndex].copiadoActivo = active;
  }
}
