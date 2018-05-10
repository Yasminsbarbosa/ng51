import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';


//não, meu estilo está em home.component.scss (aqui é onde todo o estilo do meu código está definido). Chamou o import animations e espicificou todos os atributos que usarei


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    // essa animação é para uso quando vou acrescentar os nomes que desejo lá no canto direito, aqueles que aparecem de acordo com o que escrevi no campo
    trigger('goals', [
      transition('* => *',[
        query(':enter', style ({opacity: 0}), {optional: true}),
        query(':enter', stagger('300ms',[
          animate('.6s ease-in', keyframes([
            style({opacity:0, transform: 'translateY(-75%)', offset:0}),
            style({opacity:.5, transform: 'translateY (35px)', offset:0.3}),
            style({opacity:1, transform: 'translateY(0)', offset:1.0}),



      ]))
]), {optional: true}),

//esse código serve para apagar os mesmos textos que aparecem apenas com um clique
query(':leave', stagger('300ms',[
  animate('.6s ease-in', keyframes([
    style({opacity:1, transform: 'translateY(0)', offset:0}),
    style({opacity:.5, transform: 'translateY (35px)', offset:0.3}),
    style({opacity:0, transform: 'translateY(-75%)', offset:1}),



]))
]), {optional: true})])])] })

export class HomeComponent implements OnInit {

 itemCount: number;
 //aqui é onde fica o texto do "add an item"
 btnText: string = 'Add an item';
 //aqui é o campo para o usuário assinalar, e fica escrito no campo "my first life goals"
 goalText: string = 'My first life goal';
 //aqui é o código em que eu uso para colocar as seguintes frases no lado direito do meu site
 goals = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  removeItem(i) {
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);
  }
}

