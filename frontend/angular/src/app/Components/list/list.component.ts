import { Component, Input } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { Tablero } from '../../utils/TableroTypes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [MatListModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() data!:Tablero[];

}
