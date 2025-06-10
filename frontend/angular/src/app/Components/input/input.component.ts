import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() size!: number;

  @Output() sizeChange = new EventEmitter<number>();

  onSizeInputChange(curSize: number) {
    this.size = curSize; 
    this.sizeChange.emit(curSize); 
  }
}
