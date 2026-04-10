# Concessionaria - Frontend Web

Aplicação frontend desenvolvida em Angular para consumo da API de gerenciamento de veículos, permitindo cadastro, listagem, edição e exclusão de registros.

---

## Tecnologias utilizadas

- Angular
- TypeScript
- SCSS
- RxJS

---

## Funcionalidades

- Cadastro de veículos
- Listagem de veículos
- Edição de registros
- Exclusão de veículos
- Filtro de busca por múltiplos campos
- Validação de formulário (incluindo validação de placa)
- Integração com API REST
- Interface responsiva e amigável

---

## Como executar o projeto

1. Clonar o repositório
   git clone https://github.com/Thomas-Teo/frontend.git
2. Acessar o diretório
   cd frontend
3. Instalar dependências
   npm install
4. Rodar a aplicação
   ng serve

---

### A aplicação estará disponível em:

http://localhost:4200

Integração com o Backend

O frontend consome a API desenvolvida em Spring Boot, encontrada em:
[Backend](https://github.com/Thomas-Teo/backend.git)

Certifique-se de que o backend esteja rodando em:

http://localhost:8080

---

## Endpoints utilizados:

- GET /veiculos
- GET /veiculos/{id}
- GET /veiculos?filtros
- POST /veiculos
- PUT /veiculos/{id}
- DELETE /veiculos/{id}

---

## Estrutura do projeto:

src/app/<br>
├── pages/<br>
│    ├── cadastro-veiculo/<br>
│    └── lista-veiculos/<br>
│<br>
├── service/<br>
│    └── veiculo-service.ts<br>
│<br>
├── models/<br>
│    └── veiculo.ts<br>
│<br>
├── components/<br>
│    └── navbar/<br>
│          └── navbar.ts<br>
│<br>
├── app.routes.ts<br>
└── app.component.ts<br>

---

## Arquitetura

O projeto segue uma organização baseada em separação de responsabilidades:

- Components → Responsáveis pela interface
- Services → Comunicação com a API
- Models (interfaces) → Tipagem dos dados
- Pages → Telas da aplicação

### ️Validações implementadas

- Campos obrigatórios
- Validação de formato de placa: AAA0000 ou AAA0A00
- Controle de formulário inválido
- Feedback visual para erros

### Tratamento de erros
- Tratamento de erros nas requisições HTTP
- Feedback ao usuário em operações críticas
- Prevenção de envio de dados inválidos

### Interface
- Layout baseado em card
- Inputs estilizados com foco em UX
- Tabela responsiva
- Destaque visual para ações (editar/excluir)

## Observações
Projeto desenvolvido para fins de teste técnico.

Estrutura simples, porém escalável, foco em boas práticas de Angular moderno, ntegração direta com backend REST

👨‍💻 Autor

Thomas

[GitHub](https://github.com/Thomas-Teo)