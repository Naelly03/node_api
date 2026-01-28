🏫 API de Gestão Escolar
Uma API RESTful simples desenvolvida em Node.js para gerir alunos, cursos e matrículas. O projeto utiliza Express para o servidor, Prisma como ORM para comunicar com uma base de dados PostgreSQL e Jest para testes automatizados.

🔗 Link do Projeto
Acesse a API online através do Render:

Base URL: node-api-t8z4.onrender.com

🛠 Tecnologias
Node.js & Express

Prisma (Banco de dados PostgreSQL)

Jest (Testes)

▶️ Como rodar localmente
1. Instale as dependências:
```
  npm install
```
2. Configure o banco: Crie um arquivo .env com a sua DATABASE_URL.
3. Crie as tabelas:
```
npx prisma migrate dev
````
4. Inicie o servidor:
```
npm start
```
📡 O que a API faz?
Realiza o CRUD (criar, ler, atualizar e apagar) de:

/alunos

/cursos

/matriculas



Desenvolvido por Naelly
  


