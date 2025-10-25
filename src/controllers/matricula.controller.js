const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listarMatriculas = async (req, res) => {
  try {
    const matriculas = await prisma.matricula.findMany({
      include: {
        aluno: true, 
        curso: true,
      },
    });
    res.json(matriculas);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar matrículas.' });
  }
};

const criarMatricula = async (req, res) => {
  const { alunoId, cursoId } = req.body; 

  if (!alunoId || !cursoId) {
    return res.status(400).json({ mensagem: 'alunoId e cursoId são obrigatórios.' });
  }

  try {
    const matricula = await prisma.matricula.create({
      data: {
        alunoId: alunoId,
        cursoId: cursoId,
      },
    });
    res.status(201).json(matricula);
  } catch (error) {
    if (error.code === 'P2003' || error.code === 'P2025') {
      res.status(404).json({ mensagem: 'Aluno ou Curso não encontrado.' });
    } else {
      res.status(500).json({ mensagem: 'Erro ao criar matrícula.' });
    }
  }
};

const deletarMatricula = async (req, res) => {
  const idBuscado = parseInt(req.params.id);

  try {
    await prisma.matricula.delete({
      where: { id: idBuscado },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ mensagem: 'Matrícula não encontrada.' });
  }
};

module.exports = {
  listarMatriculas,
  criarMatricula,
  deletarMatricula,
};