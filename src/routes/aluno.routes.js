const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/aluno.controller.js');

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: A lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 */
router.get('/', alunoController.listarAlunos);

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *           example:
 *             nome: "Aluno Teste"
 *             email: "aluno@teste.com"
 *     responses:
 *       201:
 *         description: O aluno foi criado com sucesso
 *       409:
 *         description: Email já cadastrado
 */
router.post('/', alunoController.criarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Busca um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do aluno
 *     responses:
 *       200:
 *         description: Os dados do aluno
 *       404:
 *         description: Aluno não encontrado
 */
router.get('/:id', alunoController.buscarAlunoPorId);

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *           example:
 *             nome: "Aluno Nome Novo"
 *             email: "aluno@novo.com"
 *     responses:
 *       200:
 *         description: O aluno foi atualizado
 *       404:
 *         description: Aluno não encontrado
 *       409:
 *         description: Email já cadastrado
 */
router.put('/:id', alunoController.atualizarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Deleta um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do aluno
 *     responses:
 *       204:
 *         description: Aluno deletado com sucesso
 *       404:
 *         description: Aluno não encontrado
 *       409:
 *         description: Aluno possui matrículas ativas
 */
router.delete('/:id', alunoController.deletarAluno);

module.exports = router;
