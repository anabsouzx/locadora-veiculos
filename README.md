# Sistema de Locação de Veículos

Aplicação Full Stack para gerenciamento de frota e locação de veículos, desenvolvida para a disciplina de **Programação com Frameworks Web**. O sistema permite cadastro e autenticação de usuários via JWT, gerenciamento de veículos com controle de disponibilidade, registro de locações com cálculo automático de diárias, consulta de histórico individual e devolução de veículos.

## Integrantes do Grupo

- Ana Beatriz Silva de Souza

## Tecnologias Utilizadas

### Backend
- **Node.js** e **Express** (API REST)
- **Prisma ORM** e **MySQL** (persistência relacional e migrations)
- **JSON Web Token (JWT)** (autenticação stateless)
- **bcrypt** (criptografia de senhas com hash)
- **dotenv** e **cors**

### Frontend
- **React** com **TypeScript** e **Vite**
- **Axios** (requisições HTTP com interceptor de token JWT)
- **React Router DOM** (roteamento e proteção de rotas privadas)

## Funcionalidades

- **Autenticação:** cadastro de usuário com validação de e-mail único, hash de senha com `bcrypt`, login com geração de token JWT, identificação do usuário autenticado e logout.
- **Veículos:** cadastro com validação de placa única e valor de diária positivo, listagem completa da frota e filtro para exibir apenas veículos disponíveis.
- **Locações:** registro de locação vinculado automaticamente ao usuário do token JWT, validação de datas e disponibilidade, cálculo do valor total no backend (considerando qualquer fração de 24h como diária completa) e atualização atômica da disponibilidade.
- **Histórico e Devolução:** consulta restrita às locações do próprio usuário (com dados do veículo via `include`) e finalização de locações ativas, liberando o veículo novamente.

## Decisões Arquiteturais

- **Separação de Camadas:** o backend divide responsabilidades em `routes` (mapeamento de endpoints e middlewares), `controllers` (tratamento de entrada e saída HTTP) e `services` (regras de negócio, validações e chamadas ao Prisma).
- **Segurança:** o hash da senha nunca é retornado nas respostas da API. Todas as rotas de veículos e locações passam pelo `authMiddleware`, que valida o cabeçalho `Authorization: Bearer <token>` e injeta o usuário decodificado em `req.usuario`.
- **Consistência e Concorrência:** o registro e a finalização de locações utilizam transações do Prisma (`prisma.$transaction`) para garantir que a criação/atualização da locação e a mudança de `disponibilidade` do veículo ocorram de forma atômica, impedindo duas locações ativas simultâneas para o mesmo veículo.

## Estrutura do Projeto

```text
locadora-veiculos/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── databases/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## Requisitos de Execução

- **Node.js** (v18 ou superior)
- **npm** (v9 ou superior)
- **MySQL** (v8 ou superior) em execução local

## Instalação e Configuração

### 1. Clonar o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd locadora-veiculos
```

### 2. Configurar o banco de dados MySQL
Crie um banco de dados vazio no MySQL:
```sql
CREATE DATABASE locadora;
```

### 3. Configurar e iniciar o Backend
```bash
cd backend
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:
```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/locadora"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3000
```

Execute as migrations do Prisma para criar as tabelas no MySQL e inicie o servidor:
```bash
npx prisma migrate dev
node src/index.js
```
O backend ficará disponível em `http://localhost:3000`.

### 4. Configurar e iniciar o Frontend
Em outro terminal, a partir da raiz do projeto:
```bash
cd frontend
npm install
npm run dev
```
O frontend ficará disponível em `http://localhost:5173`.

## Endpoints da API

| Método | Endpoint | Autenticação | Descrição |
| :--- | :--- | :---: | :--- |
| `POST` | `/auth/register` | Não | Cadastra um novo usuário |
| `POST` | `/auth/login` | Não | Autentica o usuário e retorna o JWT |
| `POST` | `/veiculos` | Sim | Cadastra um novo veículo na frota |
| `GET` | `/veiculos` | Sim | Lista todos os veículos cadastrados |
| `GET` | `/veiculos/disponiveis` | Sim | Lista apenas veículos disponíveis |
| `POST` | `/locacoes` | Sim | Registra uma nova locação para o usuário autenticado |
| `GET` | `/locacoes` | Sim | Lista o histórico de locações do usuário autenticado |
| `PATCH` | `/locacoes/:id/finalizar` | Sim | Finaliza uma locação ativa e libera o veículo |

## Dados de Exemplo para Demonstração

1. **Cadastro de Usuário (`POST /auth/register`):**
   ```json
   {
     "nome": "Ana Silva",
     "email": "ana@email.com",
     "senha": "senha123"
   }
   ```
2. **Cadastro de Veículo (`POST /veiculos`):**
   ```json
   {
     "marca": "Toyota",
     "modelo": "Corolla",
     "placa": "ABC1D23",
     "ano": 2024,
     "valor_diaria": 220.00
   }
   ```
3. **Registro de Locação (`POST /locacoes`):**
   ```json
   {
     "veiculoId": 1,
     "data_inicio": "2026-11-20T10:00:00",
     "data_prevista": "2026-11-22T14:00:00"
   }
   ```
   *(Duração de 52 horas = 3 diárias completas = R$ 660,00)*
