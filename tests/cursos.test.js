const request = require('supertest');
const express = require('express');

const {PrismaClient} = require('@prisma/client');
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

describe('API de Cursos (Testes)', () => {
  
  it('GET /cursos: Deve listar todos os cursos (vazio)', async () => {
    const response = await request(app).get('/cursos');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);    
  });


  it('POST /cursos: Deve criar um novo curso', async () => {
    const novoCurso = { nome: 'Curso de Jest' };

    const response = await request(app)
      .post('/cursos')
      .send(novoCurso); 

    expect(response.statusCode).toBe(201); 
    expect(response.body.nome).toBe('Curso de Jest'); 
    expect(response.body.id).toBeDefined(); 
  });

  
  it('GET /cursos: Deve listar cursos após a criação', async () => {
    await prisma.curso.create({
      data: { nome: 'Curso de Supertest' }
    });
    
    const response = await request(app).get('/cursos');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].nome).toBe('Curso de Supertest');
  });


  it('DELETE /cursos/:id: Deve deletar um curso', async () => {
    const curso = await prisma.curso.create({
      data: { nome: 'Curso a ser deletado' }
    });

    const response = await request(app).delete(`/cursos/${curso.id}`);

    expect(response.statusCode).toBe(204);

    const cursoDeletado = await prisma.curso.findUnique({
      where: { id: curso.id }
    });
    expect(cursoDeletado).toBeNull();
  });

});