import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { VeiculoService } from '../../service/veiculo-service';
import { Veiculo } from '../../models/veiculo';

@Component({
  selector: 'app-lista-veiculos',
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './lista-veiculos.html',
  styleUrl: './lista-veiculos.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaVeiculos implements OnInit {
  veiculos: Veiculo[] = [];
  loading = false;

  filtros = {
    marca: '',
    modelo: '',
    ano: null as number | null,
    valorMin: null as number | null,
    valorMax: null as number | null,
    placa: ''
  };

  constructor(private service: VeiculoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.loading = true;
    this.cdr.markForCheck();
    const filtrosLimpos: any = {};

    if (this.filtros.marca?.trim()) {
      filtrosLimpos.marca = this.filtros.marca.trim();
    }

    if (this.filtros.modelo?.trim()) {
      filtrosLimpos.modelo = this.filtros.modelo.trim();
    }

    if (this.filtros.ano !== null) {
      filtrosLimpos.ano = Number(this.filtros.ano);
    }

    if (this.filtros.valorMin !== null) {
      filtrosLimpos.valorMin = Number(this.filtros.valorMin);
    }

    if (this.filtros.valorMax !== null) {
      filtrosLimpos.valorMax = Number(this.filtros.valorMax);
    }

    if (this.filtros.placa?.trim()) {
      filtrosLimpos.placa = this.filtros.placa.trim();
    }

    const temFiltros = Object.keys(filtrosLimpos).length > 0;

    const request$ = temFiltros
      ? this.service.buscarComFiltros(filtrosLimpos)
      : this.service.listar();

    request$.subscribe({
      next: (data) => {
        this.veiculos = data;
        this.loading = false;
        this.cdr.markForCheck();
      },

      error: () => {
        this.veiculos = [];
        this.loading = false;
        this.cdr.markForCheck();
        alert('Erro ao carregar veículos');
      }
    });
  }

  limpar(): void {
    this.filtros = {
      marca: '',
      modelo: '',
      ano: null,
      valorMin: null,
      valorMax: null,
      placa: ''
    };

    this.carregar();
  }

  deletar(id: number): void {
    this.service.deletar(id).subscribe({
      next: () => {
        this.veiculos = this.veiculos.filter(v => v.id !== id);
        this.cdr.markForCheck();
        alert('Deletado com sucesso');
      },
      error: () => {
        alert('Erro ao deletar veículo');
      }
    });
  }
}