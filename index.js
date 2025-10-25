const express = require('express');
const app = express();
const port = 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(express.json());

// Rotas
const cursoRoutes = require('./src/routes/curso.routes.js');
const alunoRoutes = require('./src/routes/aluno.routes.js');
const matriculaRoutes = require('./src/routes/matricula.routes.js');

app.use('/cursos', cursoRoutes);
app.use('/alunos', alunoRoutes);
app.use('/matriculas', matriculaRoutes);

// Configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Cursos e Matrículas',
      version: '1.0.0',
      description: 'Documentação da API criada para o projeto Node.js',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Servidor de Desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Caminho para os arquivos com as anotações Swagger
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rota inicial
app.get('/', (req, res) => {
  res.send('API de Cursos e Matrículas');
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${port}`);
  console.log(`📘 Documentação Swagger: http://localhost:${port}/api-docs`);
});
