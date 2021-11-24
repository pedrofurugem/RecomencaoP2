import { Component } from '@angular/core';
import { Recomendacao } from './recomendacoes/recomendacao.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recomendacoes: Recomendacao[] = [];
  onRecomendacaoInserida(recomendacao){
    // console.log('Adicionando mensagem: ' + JSON. 
    //stringify(recomendacao)
    this.recomendacoes = [...this.recomendacoes, recomendacao];
  }
}
