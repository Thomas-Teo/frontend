import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VeiculoService } from '../../service/veiculo-service';
import { Veiculo } from '../../models/veiculo';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cadastrar-veiculo',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './cadastrar-veiculo.html',
  styleUrl: './cadastrar-veiculo.scss',
})
export class CadastrarVeiculo implements OnInit{
  
  id?: number;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: VeiculoService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1900)]],
      placa: ['',
        [
          Validators.required,
          Validators.pattern(/^([A-Za-z]{3}\d{4}|[A-Za-z]{3}\d[A-Za-z]\d{2})$/)
        ]
      ],
      valor: ['', [Validators.required, Validators.min(0)]]
    });
    
    this.form.get('placa')?.valueChanges.subscribe(value => {
      if (value) {
        this.form.get('placa')?.setValue(value.trim().toUpperCase(), { emitEvent: false });
      }
    });
    
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : undefined;
    if (this.id) {
      this.service.buscarPorId(this.id).subscribe(res => {
        this.form.patchValue(res);
      });
    }
  }

    salvar() {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      if (this.form.invalid) return;

      const dados: Veiculo = this.form.value;

      if (this.id) {
        this.service.atualizar(this.id, dados).subscribe(() => {
          alert('Atualizado com sucesso');
        });
      } else {
        this.service.criar(dados).subscribe(() => {
          alert('Criado com sucesso');
        });
      }
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          const mensagem = error.error?.mensagem ?? 'Erro de validação';
          alert(mensagem);
          return;
        }

        if (error.status === 404) {
          alert('Recurso não encontrado');
          return;
        }

        if (error.status === 0) {
          alert('Não foi possível conectar ao servidor');
          return;
        }

        alert('Erro inesperado ao salvar veículo');
      }
    }
}
