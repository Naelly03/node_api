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


describe('API de Alunos (Testes)', () => {

  it('GET /alunos: Deve listar um array vazio', async () => {
    const response = await request(app).get('/alunos');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('POST /alunos: Deve criar um novo aluno', async () => {
    const novoAluno = { nome: 'Aluno Teste', email: 'aluno@teste.com' };
    
    const response = await request(app)
      .post('/alunos')
      .send(novoAluno);

    expect(response.statusCode).toBe(201);
    expect(response.body.nome).toBe(novoAluno.nome);
    expect(response.body.email).toBe(novoAluno.email);
  });

  it('POST /alunos: Deve retornar 409 (Conflito) ao tentar criar com email duplicado', async () => {
    const novoAluno = { nome: 'Aluno Teste 1', email: 'emailduplicado@teste.com' };
    await request(app).post('/alunos').send(novoAluno);

    const alunoDuplicado = { nome: 'Aluno Teste 2', email: 'emailduplicado@teste.com' };
    const response = await request(app)
      .post('/alunos')
      .send(alunoDuplicado);

    expect(response.statusCode).toBe(409);
    expect(response.body.mensagem).toBe('Email já cadastrado.');
  });

  it('PUT /alunos/:id: Deve atualizar um aluno existente', async () => {
    const aluno = await prisma.aluno.create({
      data: { nome: 'Nome Antigo', email: 'antigo@teste.com' }
    });

    const dadosAtualizados = { nome: 'Nome Novo', email: 'novo@teste.com' };
    const response = await request(app)
      .put(`/alunos/${aluno.id}`)
      .send(dadosAtualizados);

    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe('Nome Novo');
  });

  it('DELETE /alunos/:id: Deve retornar 409 (Conflito) ao tentar deletar aluno com matrícula', async () => {
    const curso = await prisma.curso.create({ data: { nome: 'Curso' } });
    const aluno = await prisma.aluno.create({ data: { nome: 'Aluno', email: 'aluno@com-matricula.com' } });
    await prisma.matricula.create({
      data: { alunoId: aluno.id, cursoId: curso.id }
    });

    const response = await request(app).delete(`/alunos/${aluno.id}`);

    expect(response.statusCode).toBe(409);
    expect(response.body.mensagem).toContain('possui matrículas ativas');
  });

});