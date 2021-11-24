import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecomendacaoInserirComponent } from './recomendacoes/recomendacao-inserir/recomendacao-inserir.component';
import { RecomendacaoListarComponent } from './recomendacoes/recomendacao-listar/recomendacao-listar.component';

const routes: Routes = [
  //http://localhost:4200
  {path: '', component: RecomendacaoListarComponent },
  //http://localhost:4200/criar
  {path: 'criar', component: RecomendacaoInserirComponent },
  {path: 'editar/:idRecomendacao', component: RecomendacaoInserirComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
