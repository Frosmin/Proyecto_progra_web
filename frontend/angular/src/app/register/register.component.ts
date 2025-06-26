import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
    username = '';
    firstName = '';
    lastName = '';
    email = '';
    password = '';

    constructor(private authService: AuthService, private router: Router) {}

    private http = inject(HttpClient);

    onSubmit(): void {
      if (!this.email || !this.password || !this.username || !this.firstName || !this.lastName) {
        alert('Todos los campos son requeridos.');
        return;
      }

      const payload = {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };

        const apiUrl ='http://localhost:8080/api/user'
        this.http.post(apiUrl, payload).subscribe({
          next: (response) => {
            console.log('Usuario registrado exitosamente:', response);
            alert('Usuario registrado exitosamente!');
          },
          error: (error) => {
            console.error('Error al registrar el usuario:', error);
            alert(`Error al registrar el usuario: ${error.message || 'Error desconocido'}`);
          },
        })
    };
  }
