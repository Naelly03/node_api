const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listarAlunos = async (req, res) => {
  const alunos = await prisma.aluno.findMany();
  res.json(alunos);
};

const criarAluno = async (req, res) => {
  const novoAluno = req.body;
  try {
    const aluno = await prisma.aluno.create({
      data: novoAluno,
    });
    res.status(201).json(aluno);
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ mensagem: 'Email já cadastrado.' });
    } else {
      res.status(500).json({ mensagem: 'Erro ao criar aluno.' });
    }
  }
};

const buscarAlunoPorId = async (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const aluno = await prisma.aluno.findUnique({
    where: { id: idBuscado },
  });

  if (!aluno) {
    res.status(404).json({ mensagem: 'Aluno não encontrado' });
    return;
  }
  res.json(aluno);
};

const atualizarAluno = async (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const dadosAtualizados = req.body;

  try {
    const alunoAtualizado = await prisma.aluno.update({
      where: { id: idBuscado },
      data: dadosAtualizados,
    });
    res.json(alunoAtualizado);
  } catch (error) {
    if (error.code === 'P2025') { 
      res.status(404).json({ mensagem: 'Aluno não encontrado' });
    } else if (error.code === 'P2002') {
      res.status(409).json({ mensagem: 'Email já cadastrado.' });
    } else {
      res.status(500).json({ mensagem: 'Erro ao atualizar aluno.' });
    }
  }
};

const deletarAluno = async (req, res) => {
  const idBuscado = parseInt(req.params.id);

  try {
    await prisma.aluno.delete({
      where: { id: idBuscado },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ mensagem: 'Aluno não encontrado.' });
    } else if (error.code === 'P2003') {
      res.status(409).json({ mensagem: 'Aluno não pode ser deletado pois possui matrículas ativas.' });
    } else {
      res.status(500).json({ mensagem: 'Erro ao deletar aluno.' });
    }
  }
};

module.exports = {
  listarAlunos,
  criarAluno,
  buscarAlunoPorId,
  atualizarAluno,
  deletarAluno,
};