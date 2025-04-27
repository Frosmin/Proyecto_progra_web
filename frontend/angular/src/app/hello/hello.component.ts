import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss'
})
export class HelloComponent implements OnInit {
  message$: Observable<string> | undefined;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.message$ = this.apiService.getHelloMessage();
  }
}