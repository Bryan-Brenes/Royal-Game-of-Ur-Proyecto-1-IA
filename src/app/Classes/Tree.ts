import {Nodo} from './Nodo';

export class Tree {
    root: Nodo;

    constructor(pBoard: number[][]){
        this.root = new Nodo(pBoard);
    }

    public calcular(elemento: Nodo, num:number){
        let board = elemento.getBoard();
        let positions = this.getPositions(board);
    }

    private getPositions(pBoard: number[][]): number[][]{
        let positions = [];
        for (let i = 0; i < pBoard.length; i++) {
            for (let j = 0; j < pBoard[i].length; j++) {
                if(pBoard[i][j] == -1){
                    positions.push([i,j]);
                }
            }
        }
        if(pBoard[0][4] > 0)
            positions.push([0,4]);
        return positions;
    }
}