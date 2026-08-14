import { Component, signal } from '@angular/core';
import { TuiTiles, TuiFluidTypography, TuiStepper, TuiBadge, TuiStatus } from '@taiga-ui/kit';
import { TuiIcon, TuiInputDirective, TuiTextfield, TuiNumberFormat, TuiNumberFormatSettings, tuiTextfieldOptionsProvider, TuiButton, TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';
import { TuiInputNumber } from '@taiga-ui/kit';

interface Product {
  owner: string, baseColor: string, accentColor: string, product: string | null, loadingImage: boolean, image: string | null, price: string | null
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TuiTiles,
    TuiIcon,
    TuiInputDirective,
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
    { owner: 'PEP', baseColor: '#FF9966', accentColor: '#FFF500', product: null, loadingImage: false, image: null, price: null },
    { owner: 'PUI', baseColor: '#5AA7F7', accentColor: '#FF9966', product: null, loadingImage: false, image: null, price: null },
    { owner: 'JAVIER', baseColor: '#FFF500', accentColor: '#5AA7F7', product: null, loadingImage: false, image: null, price: null },
  ];

  protected order = new Map();

  // Escucha el evento 'paste' en la ventana del navegador
  onPaste(event: ClipboardEvent, currentItemIndex: number): void {
    this.items[currentItemIndex].loadingImage = true;
    const items = event.clipboardData?.items;

    if (!items) {
      this.items[currentItemIndex].loadingImage = false;
      return;
    }
    let found = false;
    // Busca si hay alguna imagen en los elementos del portapapeles
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        // Convierte el elemento en un archivo (File blob)
        const file = items[i].getAsFile();

        if (file) {
          found = true;
          this.convertToBase64(file, currentItemIndex);
        }
        break; // Detiene el bucle tras encontrar la primera imagen
      }
    }
    if (!found) {
      this.items[currentItemIndex].loadingImage = false;
    }
  }


  // Convierte el archivo binario en una cadena Base64 legible por la etiqueta <img>
  private convertToBase64(file: File, currentItemIndex: number): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.items[currentItemIndex].image = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  onImagenCargada(currentItemIndex: number) {
    this.items[currentItemIndex].loadingImage = false;
  }
}
