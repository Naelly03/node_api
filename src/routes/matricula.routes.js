const express = require('express');
const router = express.Router();
const matriculaController = require('../controllers/matricula.controller.js');

/**
 * @swagger
 * /matriculas:
 *   get:
 *     summary: Lista todas as matrículas
 *     tags: [Matrículas]
 *     description: Lista todas as matrículas, incluindo os dados completos do aluno e do curso.
 *     responses:
 *       200:
 *         description: A lista de matrículas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MatriculaComRelacionamentos'
 */
router.get('/', matriculaController.listarMatriculas);

/**
 * @swagger
 * /matriculas:
 *   post:
 *     summary: Cria uma nova matrícula (matricula um aluno em um curso)
 *     tags: [Matrículas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alunoId:
 *                 type: integer
 *               cursoId:
 *                 type: integer
 *           example:
 *             alunoId: 1
 *             cursoId: 2
 *     responses:
 *       201:
 *         description: Matrícula criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Matricula'
 *       400:
 *         description: alunoId e cursoId são obrigatórios
 *       404:
 *         description: Aluno ou Curso não encontrado
 */
router.post('/', matriculaController.criarMatricula);

/**
 * @swagger
 * /matriculas/{id}:
 *   delete:
 *     summary: Deleta (cancela) uma matrícula pelo ID
 *     tags: [Matrículas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID da matrícula
 *     responses:
 *       204:
 *         description: Matrícula deletada com sucesso
 *       404:
 *         description: Matrícula não encontrada
 */
router.delete('/:id', matriculaController.deletarMatricula);

module.exports = router;
