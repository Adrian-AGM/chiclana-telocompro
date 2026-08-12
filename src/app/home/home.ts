import { Component } from '@angular/core';
import {TuiTiles, TuiFluidTypography} from '@taiga-ui/kit';
	import { TuiIcon, TuiInputDirective, TuiTextfield } from '@taiga-ui/core';

@Component({
  selector: 'app-home',
  imports: [TuiTiles, TuiIcon, TuiInputDirective, TuiTextfield, TuiFluidTypography],
  templateUrl: './home.html',
  styleUrl: './home.less',
})
export class Home {protected items = [
        {content: 'Pep'},
        {content: 'Pui'},
        {content: 'Javi'},
    ];
 
    protected order = new Map();
}
