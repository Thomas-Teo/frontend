import { Routes } from '@angular/router';
import { ListaVeiculos } from './pages/lista-veiculos/lista-veiculos';
import { CadastrarVeiculo } from './pages/cadastrar-veiculo/cadastrar-veiculo';

export const routes: Routes = [
    { path: '', redirectTo: 'veiculos', pathMatch: 'full' },
    { path: 'veiculos', component: ListaVeiculos },
    { path: 'cadastro', component: CadastrarVeiculo }
];
