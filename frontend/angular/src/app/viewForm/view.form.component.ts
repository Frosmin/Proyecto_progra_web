import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ListComponent } from '../Components/list/list.component';
import { Tablero } from '../utils/TableroTypes';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-viewform',
  standalone: true,
  imports: [ListComponent, CommonModule, RouterLink],
  templateUrl: './view.form.component.html',
  styleUrl: './view.form.component.scss',
})
export class ViewFormComponent implements OnInit {
  data: Tablero[] = [];
  isLoggedIn = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.apiService.getUserTableros(currentUser.ID).subscribe({
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
  }
}
