
📘 Enem Station

Enem Station é uma plataforma desenvolvida para estudantes do ensino público que desejam se preparar para o ENEM de forma gratuita, moderna e eficiente.
O projeto reúne conteúdo, estatísticas, ferramentas de aprendizado e autenticação para garantir uma experiência personalizada ao aluno.

🚀 Tecnologias Utilizadas
Frontend

React + TypeScript

Vite

TailwindCSS

React Router DOM

React Icons

SwiperJS

React Toastify

Gerenciamento de Estado

Redux Toolkit

Backend / Autenticação

Supabase
Usado para:

Autenticação (Login, Signup, Logout)

Persistência de sessão

Gerenciamento de usuários

Ferramentas de Desenvolvimento

ESLint

Prettier

Node.js / npm

📂 Estrutura do Projeto
/src
 ├── components
 │    └── Navbar.tsx
 │
 ├── pages
 │    ├── Home.tsx
 │    ├── LoginSignup.tsx
 │    └── Content.tsx
 │
 ├── store
 │    ├── authSlice.ts
 │    └── store.ts
 │
 ├── lib
 │    └── supabaseClient.ts
 │
 ├── App.tsx
 └── main.tsx

🧠 Funcionalidades Principais
✔ Autenticação

Criar conta

Login com e-mail e senha

Logout

Persistência de sessão com Supabase

Redirecionamento automático após login

✔ Navegação

Navbar responsiva com:

Logo

Home

Conteúdo

Estatísticas

Contato

Barra de pesquisa

Área de Login/Signup

Rotas privadas com React Router + Redux

✔ Experiência do Usuário

Notificações com Toastify

Ícones visuais com React Icons

Interface moderna usando TailwindCSS

💡 Como Executar o Projeto Localmente
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/enem-station.git
cd enem-station

2️⃣ Instalar dependências
npm install

3️⃣ Criar o arquivo de ambiente

Crie um arquivo .env com:

VITE_SUPABASE_URL=SEU_URL_AQUI
VITE_SUPABASE_ANON_KEY=SUA_KEY_AQUI

4️⃣ Rodar o projeto
npm run dev


O projeto estará disponível em:
👉 http://localhost:5173/

📸 Prévia (Screenshots)

(adicione suas imagens aqui quando quiser)

🤝 Contribuição

Sinta-se à vontade para contribuir:

Abrindo Issues

Enviando Pull Requests

Sugerindo melhorias

📜 Licença

Este projeto está sob a licença MIT
