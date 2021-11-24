import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recomendacao } from '../recomendacao.model';
import { RecomendacaoService } from '../recomendacao.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-recomendacao-listar',
  templateUrl: './recomendacao-listar.component.html',
  styleUrls: ['./recomendacao-listar.component.css']
})
export class RecomendacaoListarComponent implements OnInit, OnDestroy {
    recomendacoes: Recomendacao[] = [];
    private recomendacoesSubscription: Subscription;
  
    constructor(public recomendacaoService: RecomendacaoService) {}
    
    ngOnInit(): void {
      this.recomendacaoService.getRecomendacoes();
      this.recomendacoesSubscription = this.recomendacaoService
      .getlistaRecomendacoesAtualizadaObservable()
      .subscribe((recomendacoes: Recomendacao[]) => {
        this.recomendacoes = recomendacoes;
      });
    }

    ngOnDestroy(): void {
      this.recomendacoesSubscription.unsubscribe();
    }

    onDelete (id: string): void{
      this.recomendacaoService.removerRecomendacao(id);
     }
     
  }


