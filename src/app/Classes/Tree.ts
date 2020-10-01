import {Nodo} from './Nodo';
import {cloneDeep} from 'lodash';
import { of } from 'rxjs';

export class Tree {
    root: Nodo;

    constructor(pBoard: number[][], pNum: number,b:boolean){
        if(b){
            this.root = new Nodo(pBoard,false,false);
            this.makeTree(pNum);
        }
    }

    private makeTree(pNum: number){
        let levels = 4;
        let nodeActual = this.root;
        let player = -1;
        this.searchPlays(nodeActual, pNum, player);
        let nodes = [nodeActual];
        let nodesAux = [];
        for (let index = 0; index < levels; index++) {
            if(nodes.length == 0)
                break;
            player = -player;
            while(nodes.length != 0){
                let children = [].concat(nodes[0].getChildren());
                nodes.shift();
                while(children.length != 0){
                    nodeActual = children[0];
                    if(!nodeActual.getState()){
                        if(!nodeActual.getSecondTurn()){
                            for (let i = 1; i < 5; i++) {
                                this.searchPlays(nodeActual, i, player);
                            }
                        }
                        else
                            this.searchPlays(nodeActual, 0, player);
                        nodesAux.push(nodeActual)
                    }
                    children.shift();
                }
            }
            nodes = [].concat(nodesAux);
            nodesAux = [];
        }  
    }

    public getboard(): number[][]{
        this.minimax(this.root,5,true);
        console.log(this.root.getBeta()+" **** FIN **** "+this.root.getAlpha());
        for (let index = 0; index < this.root.getChildren().length; index++) {
            if(this.root.getChildren()[index].getBeta() == this.root.getAlpha())
                return this.root.getChildren()[index].getBoard();
        }
        console.log("no entro");
        return this.root.getBoard();
    }

    public searchPlays(pNode: Nodo, pNum: number, pPlayer: number){
        let board = pNode.getBoard();
        if(pNum == 0){
            pNode.addChidren(new Nodo(cloneDeep(board), false,false));
            return;
        }
        let positions = this.getPositions(board,pPlayer);
        let count = 0;
        for (let index = 0; index < positions.length; index++) {
            let newPosition = this.positionFollow(positions[index],pNum,board,pPlayer);
            if(newPosition[0] != -1){
                count++;
                let newBoard = this.getNewBoard(newPosition, positions[index], cloneDeep(board),pPlayer);
                if(newBoard[0][5] == 7 || newBoard[2][5] == 7){
                    pNode.addChidren(new Nodo(newBoard, true,false));
                }
                else{
                    pNode.addChidren(new Nodo(newBoard, false,this.isSecondTurn(newPosition,pPlayer)));
                }
            }
        }
        if(count == 0){
            pNode.addChidren(new Nodo(cloneDeep(board), false,false));
        }
        
    }

    public search(pNodo: number[][], pNum: number): number[][][]{
        let pNode = new Nodo(pNodo,false,false);
        let board = pNode.getBoard();
        let player = 1;
        let plays = [];
        if(pNum == 0){
            pNode.addChidren(new Nodo(cloneDeep(board), false,false));
            return;
        }
        let positions = this.getPositions(board,player);
        let count = 0;
        for (let index = 0; index < positions.length; index++) {
            let newPosition = this.positionFollow(positions[index],pNum,board,player);
            if(newPosition[0] != -1){
                count++;
                let newBoard = this.getNewBoard(newPosition, positions[index], cloneDeep(board),player);
                if(newBoard[0][5] == 7 || newBoard[2][5] == 7){
                    pNode.addChidren(new Nodo(newBoard, true,false));
                }
                else{
                    pNode.addChidren(new Nodo(newBoard, false,this.isSecondTurn(newPosition,player)));
                }
                plays.push(cloneDeep(newBoard));
                console.log("-----Opciones--------");
                console.log(newBoard);
            }
        }
        if(count == 0){
            pNode.addChidren(new Nodo(cloneDeep(board), false,false));
        }
        return plays;
    }

    private isSecondTurn(pNewPosition: number[], pPlayer: number): boolean{
        let nivel = (pPlayer < 0)? 0 : 2;
        if(pNewPosition[0] == nivel && (pNewPosition[1] == 0 || pNewPosition[1] == 6)){
            return true;
        }   
        else if(pNewPosition[0] == 1 && pNewPosition[1] == 3){
            return true;
        }
        return false;
    }

    private getPositions(pBoard: number[][], pPlayer: number): number[][]{
        let positions = [];
        let nivel = (pPlayer < 0)? 0 : 2;
        for (let i = 0; i < pBoard.length; i++) {
            for (let j = 0; j < pBoard[i].length; j++) {
                if(pBoard[i][j] == pPlayer && ((i != 0 && i != 2) || (j != 4 && j != 5))){
                    positions.push([i,j]);
                }
            }
        }
        if(pBoard[nivel][4] > 0)
            positions.push([nivel,4]);
        return positions;
    }

    private positionFollow(pPosition: number[], pNum:number, pBoard: number[][], player: number): number[]{
        let pos = [-1,-1];
        let nivel = (player < 0)? 0 : 2;
        if(pPosition[0] == nivel && pPosition[1] < 5){
            pos[1] = pPosition[1] - pNum;
            pos[0] = nivel;
            if(pos[1] < 0){
                pos[1] = -pos[1] - 1;
                pos[0] = 1;
            }
        }
        else if(pPosition[0] == nivel && pPosition[1] > 5){
            pos[1] = pPosition[1] - pNum;
            if(pos[1] >= 5)
                pos[0] = nivel;
            else
                pos = [-1,-1]
        }
        else{
            pos[1] = pPosition[1] + pNum;
            pos[0] = 1;
            if(pos[1] > 7){
                pos[1] = 7 - (pos[1] - 8);
                pos[0] = nivel;
                if(pos[1] < 5)
                    pos = [-1,-1];
            }
        }
        if(pos[0] != -1 && (pBoard[pos[0]][pos[1]] == player && ((pos[1] < 4  || pos[1] > 5) || (pos[0] == 1)))){
            pos = [-1,-1];
        }
        return pos;
    }

    private getNewBoard(pNewPosition: number[], pPosition: number[], pBoard: number[][], pPlayer: number): number[][]{
        let nivel = (pPlayer < 0)? 0 : 2;
        if(pNewPosition[0] == nivel && pNewPosition[1] == 5){
            pBoard[nivel][5] += 1;
            pBoard[pPosition[0]][pPosition[1]] = 0;
        }
        else
        {
            if(pBoard[pNewPosition[0]][pNewPosition[1]] == -pPlayer)
                pBoard[(nivel-2)*-1][4] += 1;
            pBoard[pNewPosition[0]][pNewPosition[1]] = pPlayer;
            if(pPosition[0] == nivel && pPosition[1] == 4)
                pBoard[nivel][4] -= 1;
            else
                pBoard[pPosition[0]][pPosition[1]] = 0;
        }
        return pBoard;
    }

    private minimax(pNode: Nodo, pLevels: number, pMaximizingPlayer: boolean): number{
        if(pLevels == 0 || pNode.getState())
            return this.evualuate(pNode.getBoard());
        if(pMaximizingPlayer){
            let value;
            for (let index = 0; index < pNode.getChildren().length; index++) {
                let node = pNode.getChildren()[index];
                value = this.minimax(node,pLevels-1,false);
                pNode.setAlpha(Math.max(pNode.getAlpha(), value));
                if(pNode.getAlpha() >= pNode.getBeta())
                    break;
            }
            return pNode.getAlpha();
        }
        else{
            let value;
            for (let index = 0; index < pNode.getChildren().length; index++) {
                let node = pNode.getChildren()[index];
                value = this.minimax(node,pLevels-1,true);
                pNode.setBeta(Math.min(pNode.getBeta(), value));
                if(pNode.getAlpha() >= pNode.getBeta())
                    break;
            }
            return pNode.getBeta();
        }
    }

    private evualuate(pBoard: number[][]): number{
        let count = 0;
        let cant = (pBoard[0][5] - pBoard[2][5]);
        count += 12*cant;
        cant = (pBoard[2][4] - pBoard[0][4]);
        count += 2*cant;
        cant = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 4; j < 8; j++) {
                if((i == 1 && j >= 4) || (i != 1 && j >= 6)){
                    count += (-pBoard[i][j])*j;
                    if(i != 1)
                        count += (-pBoard[i][j])*2;
                }
            }
            
        }
        return count;
    }
}