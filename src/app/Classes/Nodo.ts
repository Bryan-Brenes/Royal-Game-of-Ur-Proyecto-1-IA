export class Nodo {
    private board: number[][];
    private children: Nodo[];
    private alpha: number;
    private beta: number;
    private end: boolean;
    private secondTurn: boolean;

    constructor(pBoard: number[][], pEnd: boolean, pSecondTurn: boolean){
        this.board = pBoard;
        this.children = [];
        this.alpha = -Infinity;
        this.beta = Infinity;
        this.end = pEnd;
        this.secondTurn = pSecondTurn;
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

    public getChildren(): Nodo[]{
        return this.children;
    }

    public getState(): boolean{
        return this.end;
    }

    public getSecondTurn(): boolean{
        return this.secondTurn;
    }
}