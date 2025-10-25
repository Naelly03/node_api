const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listarCursos = async (req, res) => {
  const cursos = await prisma.curso.findMany();
  res.json(cursos);
};

const criarCurso = async (req, res) => {
  const novoCurso = req.body;
  const curso = await prisma.curso.create({
    data: novoCurso,
  });
  res.status(201).json(curso);
};

const buscarCursoPorId = async (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const curso = await prisma.curso.findUnique({
    where: { id: idBuscado },
  });

  if (!curso) {
    res.status(404).json({ mensagem: 'Curso não encontrado' });
    return;
  }
  res.json(curso);
};

const atualizarCurso = async (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const dadosAtualizados = req.body;

  try {
    const cursoAtualizado = await prisma.curso.update({
      where: { id: idBuscado },
      data: dadosAtualizados,
    });
    res.json(cursoAtualizado);
  } catch (error) {
    res.status(404).json({ mensagem: 'Curso não encontrado' });
  }
};

const deletarCurso = async (req, res) => {
  const idBuscado = parseInt(req.params.id);

  try {
    await prisma.curso.delete({
      where: { id: idBuscado },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ mensagem: 'Curso não encontrado' });
  }
};

module.exports = {
  listarCursos,
  criarCurso,
  buscarCursoPorId,
  atualizarCurso,
  deletarCurso,
};