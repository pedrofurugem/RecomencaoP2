import { Injectable } from '@angular/core';
import { Recomendacao } from './recomendacao.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ 
    providedIn: 'root'
 })
export class RecomendacaoService {
    private recomendacoes: Recomendacao[] = []; 
    private listaRecomendacoesAtualizada = new Subject<Recomendacao[]>();
   
    constructor(private httpClient: HttpClient){
    }
   
   
    //uma lista e um método que dá acesso a uma cópia dela
    getRecomendacoes(): void {
        this.httpClient.get <{mensagem: string, recomendacoes:
        any}>('http://localhost:3003/api/recomendacoes')
        .pipe(map((dados) => {
            return dados.recomendacoes.map(recomendacao => {
                return {
                    id: recomendacao._id,
                    texto: recomendacao.texto
                }
            })
        }))
        .subscribe((recomendacoes) => {
                this.recomendacoes = recomendacoes;
                this.listaRecomendacoesAtualizada.next([...this.recomendacoes]);
            }
        ) 
    }
    
    //cabe ao serviço fazer a adição de textos
    adicionarRecomendacao(texto: string){
       const recomendacao: Recomendacao = {
           texto: texto
        };
        this.httpClient.post<{mensagem: string}>('http://localhost:3003/api/recomendacoes', 
            recomendacao).subscribe(
            (dados) => {
                console.log(dados.mensagem)
                this.recomendacoes.push(recomendacao);
                this.listaRecomendacoesAtualizada.next([...this.recomendacoes]);
        })
    }

    removerRecomendacao (id: string): any{
        this.httpClient.delete(`http://localhost:3003/api/recomendacoes/${id}`)
        .subscribe(
            () => {
           this.recomendacoes = this.recomendacoes.filter(rec => rec.id !== id)
           this.listaRecomendacoesAtualizada.next([...this.recomendacoes])
        });
    }
    
    getlistaRecomendacoesAtualizadaObservable(){
        return this.listaRecomendacoesAtualizada.asObservable();
    } 

    getRecomendacao (idRecomendacao: string){
        return this.httpClient.get<{_id: string, texto: string}> 
        (`http://localhost:3003/api/recomendacoes/${idRecomendacao}`);
    }     

    atualizarRecomendacao (id: string, texto: string){
        const recomendacao: Recomendacao = {id, texto};
        this.httpClient.put(`http://localhost:3003/api/recomendacoes/${id}`, recomendacao)
        .subscribe((res => {
            const copia = [...this.recomendacoes];
            const indice = copia.findIndex (rec => rec.id === recomendacao.id);
            copia[indice] = recomendacao;
            this.recomendacoes = copia;
            this.listaRecomendacoesAtualizada.next([...this.recomendacoes]);
        }));
    }
}