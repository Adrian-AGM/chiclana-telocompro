import { Component } from '@angular/core';
import { TuiTiles, TuiFluidTypography, TuiStepper, TuiConnected } from '@taiga-ui/kit';
import { TuiIcon, TuiInputDirective, TuiTextfield, TuiNumberFormat, TuiNumberFormatSettings } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiCurrencyPipe } from '@taiga-ui/addon-commerce';
import { TuiInputNumber } from '@taiga-ui/kit';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TuiTiles,
    TuiIcon,
    TuiInputDirective, TuiStepper, TuiConnected, TuiNumberFormat, TuiTextfield, TuiFluidTypography, FormsModule, CommonModule, TuiCurrencyPipe, TuiInputNumber],
  templateUrl: './home.html',
  styleUrls: ['./home.less'],
})


export class Home {
  protected numberFormat: Partial<TuiNumberFormatSettings> = {
    decimalSeparator: ',',
    thousandSeparator: '.',
  };
  protected items = [
    { owner: 'Pep', product: null, image: null, price: null },
    { owner: 'Pui', product: null, image: null, price: null },
    { owner: 'Javi', product: null, image: null, price: null },
  ];

  protected order = new Map();

  // Escucha el evento 'paste' en la ventana del navegador
  onPaste(event: ClipboardEvent, currentItemIndex: number): void {
    const items = event.clipboardData?.items;

    if (!items) return;

    // Busca si hay alguna imagen en los elementos del portapapeles
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        // Convierte el elemento en un archivo (File blob)
        const file = items[i].getAsFile();

        if (file) {
          this.convertToBase64(file, currentItemIndex);
        }
        break; // Detiene el bucle tras encontrar la primera imagen
      }
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
}
