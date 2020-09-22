import { Component, OnInit } from '@angular/core';
import {Tree} from './Classes/Tree';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'royal-game-of-ur';

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
  playerTurn: boolean;

  // Probabilidades de obtener numeros con dados
  one_two_probalitiy: number;
  three_four_probability: number;

  numberRolled: number;

  constructor(){}

  ngOnInit(){
    this.totalChips = 7;
    this.blackChipsCount = this.totalChips;
    this.whiteChipsCount = this.totalChips;
    this.blackChipsEndCount = 3;
    this.whiteChipsEndCount = 7;
    this.playerTurn = true;
    this.one_two_probalitiy = 0.375;
    this.three_four_probability = 0.125;
    this.numberRolled = 0;
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
    this.playerTurn = false;
    setTimeout(()=> this.togglePlayerTurn(), 1000);
  }

  togglePlayerTurn(){
    this.playerTurn = !this.playerTurn;
  }

  rollDice():number{
    let random = Math.random();
    let tree = new Tree([[0,-1,-1,0,1,0,0,0],[0,1,-1,0,0,0,-1,0],[0,0,1,1,2,0,0,0]],4);
    //let tree = new Tree([[0,0,-1,0,2,0,0,0],[0,-1,-1,0,0,0,-1,0],[0,0,1,1,2,0,0,0]],4);

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

}
