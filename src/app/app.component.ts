import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'royal-game-of-ur';

  // indica si el juego no ha terminado o no ha empezado
  activeGame: boolean;

  // variables que indican quien ganó
  blackWins: boolean;
  whiteWins: boolean;

  // variable que indica en seleccion de ficha
  blockDice: boolean;

  // variable que indica si donde caí es una estrella
  caiEstrella: boolean;

  // Texto de gane
  winningText: string;

  // Array de tamaño 24 para representar el tablero
  board: number[];

  // posicion en el tablero donde estan las fichas por jugar del jugador blanco
  whtLeftChipsBoardPos: number;

  // posicion en el tablero donde estan las fichas por jugar del jugador negro
  bckLeftChipsBoardPos: number;

  // posicion en el tablero donde estan las fichas que salieron de jugador blanco
  whtDoneChipsBoardPos: number;

  // posicion en el tablero donde estan las fichas que salieron del jugador negro
  bckDoneChipsBoardPos: number;

  // Posiciones en tablero donde esta la flor
  flowerBoardPos: number[];

  // valor que representa a las fichas blancas
  whiteValue: number;

  // valor que representa a las fichas negras
  blackValue: number;

  // numero total de fichas
  totalChips: number;

  // cantidad de fichas negras que todavía tiene por jugar
  blackChipsCount: number;
  // cantidad de fichas blancas que todavía tiene por jugar
  whiteChipsCount: number;

  // cantidad de fichas negras que has llegado al final
  blackChipsEndCount: number;
  // cantidad de fichas blancas que has llegado al final
  whiteChipsEndCount: number;

  // variable that enables spin button
  // true: jugador humano
  playerTurn: boolean;

  // Probabilidades de obtener numeros con dados
  one_two_probalitiy: number;
  three_four_probability: number;

  numberRolled: number;

  constructor(){}

  ngOnInit(){
    this.activeGame = false;
    this.blockDice = false;
    this.caiEstrella = false;
    this.winningText = 'Iniciar Partida';
    this.blackWins = false;
    this.whiteWins = false;

    // probabilidades
    this.one_two_probalitiy = 0.375;
    this.three_four_probability = 0.125;

    // Inicializacion de variables para el juego
    this.totalChips = 7;
    this.blackChipsCount = this.totalChips;
    this.whiteChipsCount = this.totalChips;
    this.blackChipsEndCount = 0;
    this.whiteChipsEndCount = 0;
    this.whiteValue = 1;
    this.blackValue = -1;
    this.playerTurn = true;
    this.numberRolled = 0;

    // Inicializacion de variables del tablero
    this.bckLeftChipsBoardPos = 4;
    this.bckDoneChipsBoardPos = 5;
    this.whtLeftChipsBoardPos = 20;
    this.whtDoneChipsBoardPos = 21;
    this.flowerBoardPos = [0, 6, 11, 16, 22];
    this.initBoard();
  }

  /**
   * devuelve un arreglo de un tamaño especifico
   * @param cant: tamaño del arreglo
   */
  getArray(cant:number){
    if(cant < 0){
      return Array(this.totalChips);
    }
    return Array(cant);
  }

  handlePlayerTurn(){
    this.numberRolled = this.rollDice();
    this.blockDice = true;



    //this.playerTurn = false;
    //setTimeout(()=> this.togglePlayerTurn(), 1000);
    //this.updateInterfaz();

    // Al fina debe jugar inmediatament la IA
    //this.handleIATurn();
  }

  handleIATurn(){
  }

  handleCellClick(cellIndex: number){
    if(!this.blockDice){
      return;
    }
    console.log("Se presionó la celda: ", cellIndex);
    // Esto implica que es el jugador blanco
    if(this.playerTurn){
      // fijarse si se presionó la celda 20
      if(cellIndex == this.whtLeftChipsBoardPos){
        // fijar si hay fichas por jugar
        if(this.board[this.whtLeftChipsBoardPos] > 0){
          // mover la ficha indicada
          let newBoard = this.moveWhiteChip(this.board, cellIndex, this.numberRolled);

          // si el tablero devuelto es distinto de nulo cambiar el tablero global
          if(newBoard){
            this.board = newBoard;
            this.blockDice = false;
            if(!this.caiEstrella){
              this.togglePlayerTurn();
            } else {
              this.caiEstrella = false;
            }
            this.updateInterfaz();

            // revisar si el jugador blanco ganó
            if(this.board[this.whtDoneChipsBoardPos] === this.totalChips){
              this.winningText = "Partida finalizada";
              this.activeGame = false;
              this.whiteWins = true;
            }
          // jugada inválida
          } else {
            return;
          }
        } else {
          return;
        }
      } else {
        let cellValue = this.board[cellIndex];
        // revisar si hay una ficha blanca debajo
        if(cellValue === this.whiteValue){
          let newBoard = this.moveWhiteChip(this.board, cellIndex, this.numberRolled);

          // revisar si la jugada fue válida
          if(newBoard){
            this.board = newBoard;
            this.blockDice = false;
            if(!this.caiEstrella){
              this.togglePlayerTurn();
            } else {
              this.caiEstrella = false;
            }
            this.updateInterfaz();
            // revisar si el jugador blanco ganó
            if(this.board[this.whtDoneChipsBoardPos] === this.totalChips){
              this.winningText = "Partida finalizada";
              this.activeGame = false;
              this.whiteWins = true;
            }
          } else {
            return;
          }
        // hay una ficha negra debajo
        } else {
          return;
        }
      }
    } else {
      // fijarse si se presionó la celda 4
      if(cellIndex == this.bckLeftChipsBoardPos){
        // fijar si hay fichas por jugar
        if(this.board[this.bckLeftChipsBoardPos] > 0){
          // mover la ficha indicada
          let newBoard = this.moveBlackChip(this.board, cellIndex, this.numberRolled);

          // si el tablero devuelto es distinto de nulo cambiar el tablero global
          if(newBoard){
            this.board = newBoard;
            this.blockDice = false;
            if(!this.caiEstrella){
              this.togglePlayerTurn();
            } else {
              this.caiEstrella = false;
            }
            this.updateInterfaz();
            // revisar si el jugador blanco ganó
            if(this.board[this.bckDoneChipsBoardPos] === this.totalChips){
              this.winningText = "Partida finalizada";
              this.activeGame = false;
              this.blackWins = true;
            }
          // jugada inválida
          } else {
            return;
          }
        } else {
          return;
        }
      } else {
        let cellValue = this.board[cellIndex];
        // revisar si hay una ficha blanca debajo
        if(cellValue === this.blackValue){
          let newBoard = this.moveBlackChip(this.board, cellIndex, this.numberRolled);

          // revisar si la jugada fue válida
          if(newBoard){
            this.board = newBoard;
            this.blockDice = false;
            if(!this.caiEstrella){
              this.togglePlayerTurn();
            } else {
              this.caiEstrella = false;
            }
            this.updateInterfaz();
            // revisar si el jugador blanco ganó
            if(this.board[this.bckDoneChipsBoardPos] === this.totalChips){
              this.winningText = "Partida finalizada";
              this.activeGame = false;
              this.blackWins = true;
            }
          } else {
            return;
          }
        // hay una ficha negra debajo
        } else {
          return;
        }
      }
    }
  }

  togglePlayerTurn(){
    this.playerTurn = !this.playerTurn;
  }

  /**
   * Funcion que devuele un número aleatorio entre 1 y 4 dada 
   * la probabilidad de cada número
   * 1: 37.5%
   * 2: 37.5%
   * 3: 12.5%
   * 4: 12.5%
   */
  rollDice():number{
    let random = Math.random();
    if(random >= 0 && random <= this.one_two_probalitiy){
      return 1;
    }
    else if(random > this.one_two_probalitiy && random <= this.one_two_probalitiy * 2){
      return 2;
    }
    else if(random > this.one_two_probalitiy *2 && random <= ( this.one_two_probalitiy * 2 ) + this.three_four_probability){
      return 3;
    } else {
      return 4;
    }
  }

  initBoard(){
    // llenar el tablero con ceros (no hay piezes colocadas)
    this.board = Array(24).fill(0);

    // colocar la cantidad de fichas de cada jugador en la celda respectiva
    this.board[this.bckLeftChipsBoardPos] = this.totalChips;
    this.board[this.whtLeftChipsBoardPos] = this.totalChips;

    //this.blackChipsEndCount = 3;

    //console.log(this.board);
    //console.log(this.moveBlackChip(this.board, 4, 4));

    //this.board = this.moveBlackChip(this.board, 4, 4);
    //console.log(this.board);
    //this.board = this.moveBlackChip(this.board, 0, 1);
    //console.log(this.board);
    //this.board = this.moveBlackChip(this.board, 8, 2);
    //console.log(this.board);

    //console.log(this.moveBlackChip(this.board, 0, 2));
    //console.log(this.moveWhiteChip(this.board, 20, 3));
    //console.log(this.moveWhiteChip(this.board, 20, 4));
    //console.log(this.moveWhiteChip(this.board, 16, 2));
    //console.log(this.putChipInBoard([0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0], 14, 22, 1));
  }

  moveWhiteChip(actualBoard: number[], actualPos: number, steps: number){
    
    // ------------------------------------------------------------
    // movimiento hacia la izq y estoy en parte inferior del tablero
    // ------------------------------------------------------------
    if(actualPos >= 16 && actualPos <= 23){

      if(actualPos >= 16 && actualPos <= 20){
        let tempPos = actualPos - steps;

        if (tempPos < 16){

          let newPos = 8 + (16 - (actualPos - steps + 1) );
          let newBoard = this.putChipInBoard(actualBoard,actualPos, newPos, this.whiteValue);
          if(newBoard){
            newBoard[actualPos] = 0;
            return newBoard;
          }
          return null;
        } else {
          let newBoard = this.putChipInBoard(actualBoard, actualPos, tempPos, this.whiteValue);
          if(newBoard){
            newBoard[actualPos] = (actualPos != 20) ? 0 : newBoard[actualPos];
            return newBoard;
          }
          return null;
          //return newBoard;
        }
      } else {
        let tempPos = actualPos - steps;
        if(tempPos < 21){
          return null;
        } else {
          let newBoard = this.putChipInBoard(actualBoard, actualPos, tempPos, this.whiteValue);
          if(newBoard){
            newBoard[actualPos] = 0;
            return newBoard;
          }
          return null;
          //return actualBoard[tempPos] = this.blackValue;
        }
      }

      
    // ------------------------------------------------------------
    // movimiento hacia la derecha y estoy en parte central del tablero
    // ------------------------------------------------------------
    } else if(actualPos >= 8 && actualPos <= 15){

      let newPos = actualPos + steps;
      if(newPos <= 15){
        let newBoard = this.putChipInBoard(actualBoard, actualPos, newPos, this.whiteValue);
        if(newBoard){
          newBoard[actualPos] = 0;
          return newBoard;
        }
        return null;
      } else {
        newPos = 23 - ((actualPos + steps) - 16);
        if(newPos < 21){
          return null;
        } else {
          let newBoard = this.putChipInBoard(actualBoard, actualPos, newPos, this.whiteValue);
          if(newBoard){
            newBoard[actualPos] = 0;
            return newBoard;
          }
          return null;
        }
      }
    } else {
      // Error, fichas blancas no pueden estar en la parte superior del tablero
      return null;
    }

  }

  moveBlackChip(actualBoard: number[], actualPos: number, steps: number){

    // ------------------------------------------------------------
    // movimiento hacia la izq y estoy en parte superior del tablero
    // ------------------------------------------------------------
    if(actualPos >= 0 && actualPos <= 7){

      if(actualPos >= 0 && actualPos <= 4){
        let tempPos = actualPos - steps;
        if (tempPos < 0){
          let newPos = 8 + (Math.abs(actualPos - steps) - 1);
          console.log("posicion con ajuste en fila sup: ", newPos);
          let newBoard = this.putChipInBoard(actualBoard,actualPos, newPos, this.blackValue);
          if(newBoard){
            newBoard[actualPos] = 0;
            return newBoard;
          }
          return null;
        } else {
          let newBoard = this.putChipInBoard(actualBoard, actualPos, tempPos, this.blackValue);
          if(newBoard){
            newBoard[actualPos] = (actualPos != 4) ? 0 : newBoard[actualPos];
            //newBoard[actualPos] = 0;
            return newBoard;
          }
          return null;
          //return newBoard;
        }
      } else {
        let tempPos = actualPos - steps;
        if(tempPos < 5){
          return null;
        } else {
          let newBoard = this.putChipInBoard(actualBoard, actualPos, tempPos, this.blackValue);
          if(newBoard){
            newBoard[actualPos] = 0;
            return newBoard;
          }
          return null;
          //return actualBoard[tempPos] = this.blackValue;
        }
      }

      
    // ------------------------------------------------------------
    // movimiento hacia la derecha y estoy en parte central del tablero
    // ------------------------------------------------------------
    } else if(actualPos >= 8 && actualPos <= 15){

      let newPos = actualPos + steps;
      if(newPos <= 15){
        let newBoard = this.putChipInBoard(actualBoard, actualPos, newPos, this.blackValue);
        if(newBoard){
          newBoard[actualPos] = 0;
          return newBoard;
        }
        return null;
      } else {
        newPos = 7 - ((actualPos + steps) - 16);
        if(newPos < 5){
          return null;
        } else {
          let newBoard = this.putChipInBoard(actualBoard, actualPos, newPos, this.blackValue);
          if(newBoard){
            newBoard[actualPos] = 0;
            return newBoard;
          }
          return null;
        }
      }
    } else {
      // Error, fichas negras no pueden estar en la parte inferior del tablero
      return null;
    }
  }

  putChipInBoard(actualBoard: number[], oldPos: number, positionObjetivo: number, player: number){
    // revisar si la posicionObjetivo es estrella
    let esEstrella = false;
    for(let pos of this.flowerBoardPos){
      if( positionObjetivo === pos){
        esEstrella = true;
        this.caiEstrella = true;
        break;
      }
    }
    console.log("Es estrella?: ", esEstrella);

    if(esEstrella){
      if(actualBoard[positionObjetivo] != 0){
        return null;
      } else {
        if(oldPos === this.bckLeftChipsBoardPos){
          actualBoard[this.bckLeftChipsBoardPos] -= 1;
        }
        if(oldPos === this.whtLeftChipsBoardPos){
          actualBoard[this.whtLeftChipsBoardPos] -= 1;
        }
        actualBoard[positionObjetivo] = player;
        return actualBoard;
      }
    } else {
      if(player === this.blackValue){

        if(positionObjetivo === this.bckDoneChipsBoardPos){
          actualBoard[this.bckDoneChipsBoardPos] += 1;
          return actualBoard;
        }

        //---------------
        let positionObjetivoValor = actualBoard[positionObjetivo];
        console.log('Valor de la posicion objetivo: ', positionObjetivoValor);
        if(positionObjetivoValor === 0){
          if(oldPos === this.bckLeftChipsBoardPos){
            actualBoard[this.bckLeftChipsBoardPos] -= 1;
          }
          actualBoard[positionObjetivo] = this.blackValue;
          return actualBoard;
        } else if(positionObjetivoValor === this.blackValue) {
          return null;
        } else {
          actualBoard[positionObjetivo] = this.blackValue;
          actualBoard[this.whtLeftChipsBoardPos] += 1;
          return actualBoard;
        }
        //---------------
      } else {
        if(positionObjetivo === this.whtDoneChipsBoardPos){
          actualBoard[this.whtDoneChipsBoardPos] += 1;
          return actualBoard;
        }
        let positionObjetivoValor  = actualBoard[positionObjetivo];
        if(positionObjetivoValor === 0){
          if(oldPos === this.whtLeftChipsBoardPos){
            actualBoard[this.whtLeftChipsBoardPos] -= 1;
          }
          actualBoard[positionObjetivo] = this.whiteValue;
          return actualBoard;
        } else if(positionObjetivoValor === this.whiteValue) {
          return null;
        } else {
          actualBoard[positionObjetivo] = this.whiteValue;
          actualBoard[this.bckLeftChipsBoardPos] += 1;
          return actualBoard;
        }
      }
    }

    return actualBoard;
  }

  updateInterfaz(){
    let cells = document.querySelectorAll('.cell');
    let boardCellIndex: any;
    for(boardCellIndex in this.board){
      //console.log(boardCellIndex)
      if(boardCellIndex != 4 && boardCellIndex != 5 && boardCellIndex != 20 && boardCellIndex != 21){
        if(this.board[boardCellIndex] == this.whiteValue){
          cells[boardCellIndex].classList.remove('black');
          cells[boardCellIndex].classList.add('white');
        } else if (this.board[boardCellIndex] == this.blackValue){
          cells[boardCellIndex].classList.remove('white');
          cells[boardCellIndex].classList.add('black');
        } else {
          cells[boardCellIndex].classList.remove('white');
          cells[boardCellIndex].classList.remove('black');
        }
      } 
    }
    this.blackChipsCount = this.board[this.bckLeftChipsBoardPos];
    this.whiteChipsCount = this.board[this.whtLeftChipsBoardPos];
    this.blackChipsEndCount = this.board[this.bckDoneChipsBoardPos];
    this.whiteChipsEndCount = this.board[this.whtDoneChipsBoardPos];
    //console.log(cells)
  }

  startGame(){
    this.initBoard();
    this.updateInterfaz();
    this.blackWins = false;
    this.whiteWins = false;
    this.activeGame = true;
    this.playerTurn = (Math.random() < 0.5) ? true : false;

    if(!this.playerTurn){
      this.handleIATurn();
    }
  }

  skipTurn(){
    this.togglePlayerTurn();
    this.blockDice = false;
  }

}
