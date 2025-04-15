import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  board: number[][] = [];
  snake: { x: number, y: number }[] = [];
  direction: string = 'right';
  food: { x: number, y: number } = { x: 0, y: 0 };
  boardSize: number = 20;
  gameInterval: any;

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    this.board = Array(this.boardSize).fill(0).map(() => Array(this.boardSize).fill(0));
    this.snake = [{ x: 5, y: 5 }];
    this.spawnFood();
    this.gameInterval = setInterval(() => this.moveSnake(), 200);
  }

  spawnFood(): void {
    let x, y;
    do {
      x = Math.floor(Math.random() * this.boardSize);
      y = Math.floor(Math.random() * this.boardSize);
    } while (this.snake.some(segment => segment.x === x && segment.y === y));
    this.food = { x, y };
  }

  moveSnake(): void {
    const head = { ...this.snake[0] };
    switch (this.direction) {
      case 'up': head.y--; break;
      case 'down': head.y++; break;
      case 'left': head.x--; break;
      case 'right': head.x++; break;
    }

    if (this.isCollision(head)) {
      alert('Game Over!');
      clearInterval(this.gameInterval);
      return;
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.spawnFood();
    } else {
      this.snake.pop();
    }
  }

  isCollision(head: { x: number, y: number }): boolean {
    return head.x < 0 || head.x >= this.boardSize || head.y < 0 || head.y >= this.boardSize ||
           this.snake.some(segment => segment.x === head.x && segment.y === head.y);
  }

  @HostListener('window:keydown', ['$event'])
  changeDirection(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp': if (this.direction !== 'down') this.direction = 'up'; break;
      case 'ArrowDown': if (this.direction !== 'up') this.direction = 'down'; break;
      case 'ArrowLeft': if (this.direction !== 'right') this.direction = 'left'; break;
      case 'ArrowRight': if (this.direction !== 'left') this.direction = 'right'; break;
    }
  }
}
