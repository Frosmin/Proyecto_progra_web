import { Component, Input, OnInit } from '@angular/core';
import { boardType } from '../utils/FormType';
import { BoardComponent } from '../board/board.component';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CoordinateDictionary, PiecePosition, PieceType } from '../utils/BoxTypes';
import { Position, Tablero } from '../utils/TableroTypes';

@Component({
  selector: 'app-vista',
  imports: [BoardComponent],
  templateUrl: './vista.component.html',
  styleUrl: './vista.component.scss',
})
export class VistaComponent implements OnInit {
  editor: boolean = false; // Para determinar si se está en modo edición o no
  boards: boardType[] = [
    {
      id: 'singleBoard',
      size: 8,
      pieces: [],
    },
  ];

  boardTitle: string = '';
  boardDescription: string = '';
  initialPositions: CoordinateDictionary<PiecePosition> = {};

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getTablero(id).subscribe({
      next: (data) => {
        this.boardTitle = data.Title;
        this.boardDescription = data.Description;
        this.boards[0].size = data.Size;
        if (data.Positions) {
          this.initialPositions = this.transformPositions(data.Positions);
        }
        console.log('Mensaje recibido:', data);
      },
      error: (err) => {
        console.error('Error al llamar al API:', err);
      },
    });
  }


  private transformPositions(positions: Position[]): CoordinateDictionary<PiecePosition> {
    const piecePositions: CoordinateDictionary<PiecePosition> = {};
    positions.forEach(pos => {
      piecePositions[`${pos.PosX}-${pos.PosY}`] = {
        piece: pos.Type as PieceType,
        x: pos.PosX,
        y: pos.PosY
      };
    });
    return piecePositions;
  }
}
