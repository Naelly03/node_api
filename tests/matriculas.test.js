const request = require('supertest');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cursoRoutes = require('../src/routes/curso.routes.js');
const alunoRoutes = require('../src/routes/aluno.routes.js');
const matriculaRoutes = require('../src/routes/matricula.routes.js');

const app = express();
app.use(express.json());
app.use('/cursos', cursoRoutes);
app.use('/alunos', alunoRoutes);
app.use('/matriculas', matriculaRoutes);

beforeEach(async () => {
  await prisma.matricula.deleteMany();
  await prisma.aluno.deleteMany();
  await prisma.curso.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});


describe('API de Matrículas (Testes)', () => {

  let alunoTeste;
  let cursoTeste;

  beforeEach(async () => {
    alunoTeste = await prisma.aluno.create({
      data: { nome: 'Aluno Padrão', email: 'aluno@padrao.com' }
    });
    cursoTeste = await prisma.curso.create({
      data: { nome: 'Curso Padrão' }
    });
  });

  it('POST /matriculas: Deve criar uma nova matrícula', async () => {
    const novaMatricula = {
      alunoId: alunoTeste.id,
      cursoId: cursoTeste.id
    };

    const response = await request(app)
      .post('/matriculas')
      .send(novaMatricula);

    expect(response.statusCode).toBe(201);
    expect(response.body.alunoId).toBe(alunoTeste.id);
    expect(response.body.cursoId).toBe(cursoTeste.id);
  });

  it('POST /matriculas: Deve retornar 404 (Não Encontrado) se o alunoId não existir', async () => {
    const novaMatricula = {
      alunoId: 9999, // ID inválido
      cursoId: cursoTeste.id
    };

    const response = await request(app)
      .post('/matriculas')
      .send(novaMatricula);

    expect(response.statusCode).toBe(404);
    expect(response.body.mensagem).toBe('Aluno ou Curso não encontrado.');
  });

  it('POST /matriculas: Deve retornar 404 (Não Encontrado) se o cursoId não existir', async () => {
    const novaMatricula = {
      alunoId: alunoTeste.id,
      cursoId: 9999 
    };

    const response = await request(app)
      .post('/matriculas')
      .send(novaMatricula);

    expect(response.statusCode).toBe(404);
    expect(response.body.mensagem).toBe('Aluno ou Curso não encontrado.');
  });

  it('GET /matriculas: Deve listar matrículas com dados do aluno e curso (include)', async () => {
    await request(app)
      .post('/matriculas')
      .send({ alunoId: alunoTeste.id, cursoId: cursoTeste.id });

    const response = await request(app).get('/matriculas');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].aluno).toBeDefined(); 
    expect(response.body[0].curso).toBeDefined(); 
    expect(response.body[0].aluno.nome).toBe('Aluno Padrão');
  });

  it('DELETE /matriculas/:id: Deve deletar uma matrícula', async () => {
    const matriculaResponse = await request(app)
      .post('/matriculas')
      .send({ alunoId: alunoTeste.id, cursoId: cursoTeste.id });
    
    const matriculaId = matriculaResponse.body.id;

    const deleteResponse = await request(app).delete(`/matriculas/${matriculaId}`);
    expect(deleteResponse.statusCode).toBe(204);

    const getResponse = await request(app).get('/matriculas');
    expect(getResponse.body.length).toBe(0);
  });

});