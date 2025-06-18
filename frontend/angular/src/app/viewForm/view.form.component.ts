import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ListComponent } from '../Components/list/list.component';
import { Tablero } from '../utils/TableroTypes';

@Component({
  selector: 'app-viewform',
  imports: [ListComponent],
  templateUrl: './view.form.component.html',
  styleUrl: './view.form.component.scss',
})
export class ViewFormComponent implements OnInit {
  data: Tablero[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTableros().subscribe({
      next: (data) => {
        this.data = data;
        console.log('Mensaje recibido:', this.data);
      },
      error: (err) => {
        console.error('Error al llamar al API:', err);
      },
    });
  }
}
