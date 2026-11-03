# 💰 Saldify — Painel Financeiro

O **Saldify** é uma aplicação web de gerenciamento financeiro pessoal, desenvolvida para facilitar o controle de receitas e despesas, permitindo acompanhar movimentações financeiras de maneira simples e organizada.

O projeto foi desenvolvido com foco em organização, usabilidade e aplicação de boas práticas de desenvolvimento Full Stack.

## 🚀 Tecnologias utilizadas

### Frontend
- React
- JavaScript
- Vite
- CSS
- React Router

### Backend
- Node.js
- Express
- Sequelize
- JWT (JSON Web Token)
- Bcrypt

### Banco de dados
- PostgreSQL

## ✨ Funcionalidades

- Cadastro e autenticação de usuários.
- Login e gerenciamento de sessão.
- Visualização de informações financeiras.
- Cadastro de receitas e despesas.
- Listagem de transações.
- Visualização detalhada das transações.
- Edição e exclusão de transações.
- Filtro de transações por data.
- Edição de perfil do usuário.
- Opção para visualizar e ocultar senha.

## 📂 Estrutura do projeto

```text
saldify/
│
├── api/
│   ├── config/
│   ├── database/
│   ├── src/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── front-project/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

```bash
cd saldify
```

### 2. Configurar o Backend

```bash
cd api
npm install
```

Configure as variáveis de ambiente no arquivo `.env`, conforme as configurações do backend.

Em seguida, execute:

```bash
npm run dev
```

### 3. Configurar o Frontend

Em outro terminal:

```bash
cd front-project
npm install
```

Execute o projeto:

```bash
npm run dev
```

O Vite disponibilizará o endereço local para acessar a aplicação.

## 🌐 Deploy

O projeto possui deploy online:

- **Frontend:** Vercel
- **Backend:** Render

## 👨‍💻 Desenvolvedor

Projeto desenvolvido como parte do meu aprendizado e evolução no desenvolvimento Full Stack, colocando em prática conhecimentos de React, Node.js, Express e PostgreSQL.

---

**Saldify — Organize suas finanças, acompanhe sua evolução.**