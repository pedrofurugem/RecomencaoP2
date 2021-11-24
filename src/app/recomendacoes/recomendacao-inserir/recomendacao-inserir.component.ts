import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Recomendacao } from '../recomendacao.model';
import { RecomendacaoService } from '../recomendacao.service';
@Component({
  selector: 'app-recomendacao-inserir',
  templateUrl: './recomendacao-inserir.component.html',
  styleUrls: ['./recomendacao-inserir.component.css'],
})
export class RecomendacaoInserirComponent implements OnInit{

  constructor(public recomendacaoService: RecomendacaoService, public route: ActivatedRoute){}
  
  private modo: string = "criar";
  private idRecomendacao: string;
  public recomendacao: Recomendacao;

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idRecomendacao")){
        this.modo = "editar";
        this.idRecomendacao = paramMap.get("idRecomendacao")
        this.recomendacaoService.getRecomendacao(this.idRecomendacao)
      }
      else{
        this.modo = "criar";
        this.idRecomendacao = null
      }
      });
  }
 
    onSalvarRecomendacao(form: NgForm) {
      if (form.invalid){
        return;
      }
      if (this.modo === "criar"){
        this.recomendacaoService.adicionarRecomendacao(
        form.value.texo,
        );
      }
      else{
        this.recomendacaoService.atualizarRecomendacao(
        this.idRecomendacao,
        form.value.texto,
      )
    }
    form.resetForm();
  }
}
   
    