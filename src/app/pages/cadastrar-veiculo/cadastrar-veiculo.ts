import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VeiculoService } from '../../service/veiculo-service';
import { Veiculo } from '../../models/veiculo';
import { CommonModule } from '@angular/common';

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
    }
}
