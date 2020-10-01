import { Injectable } from '@angular/core';
import { Tree } from '../Classes/Tree';

@Injectable({
  providedIn: 'root'
})
export class ArtificialInteligenceService {

  constructor() { }

  minimax(board:number[], numberRolled: number){

    // Darle formato de matriz a tablero
    let formatedBoard: number[][] = this.formatearTableroAMatriz(board);

    // obtener el nuevo tablero con la jugada
    let tree = new Tree(formatedBoard, numberRolled, true);
    
    //console.log(this.formatearTableroALista([[1,2,3],[4,5,6],[7,8,9]]));
    //console.log(this.formatearTableroAMatriz([0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0]));

    // Darle formato de lista a tablero
    return this.formatearTableroALista(tree.getboard());

  }

  private formatearTableroALista(matrixBoard): number[]{
    return matrixBoard.flat();
  }

  private formatearTableroAMatriz(listBoard:number[]){
    return [[...listBoard.slice(0,8)],[...listBoard.slice(8,16)],[...listBoard.slice(16,24)]]
  }
}
