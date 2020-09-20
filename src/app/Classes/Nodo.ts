export class Nodo {
    private board: number[][];
    private children: Nodo[];
    private alpha: number;
    private beta: number;

    constructor(pBoard: number[][]){
        this.board = pBoard;
        this.children = [];
        this.alpha = -Infinity;
        this.beta = Infinity;
    }

    public addChidren(pChildren: Nodo){
        this.children.push(pChildren);
    }

    public setAlpha(pNum: number){
        this.alpha = pNum;
    }

    public setBeta(pNum: number){
        this.beta = pNum;
    }

    public getAlpha(): number{
        return this.alpha;
    }

    public getBeta(): number{
        return this.beta;
    }

    public getBoard(): number[][]{
        return this.board;
    }
}