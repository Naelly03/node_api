const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/curso.controller.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID auto-gerado do curso.
 *         nome:
 *           type: string
 *           description: O nome do curso.
 *       example:
 *         id: 1
 *         nome: "Node.js Básico"
 *
 *     Aluno:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID auto-gerado do aluno.
 *         nome:
 *           type: string
 *           description: O nome do aluno.
 *         email:
 *           type: string
 *           description: O email (único) do aluno.
 *       example:
 *         id: 1
 *         nome: "Naelly"
 *         email: "naelly@email.com"
 *
 *     Matricula:
 *       type: object
 *       required:
 *         - alunoId
 *         - cursoId
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID auto-gerado da matrícula.
 *         dataMatricula:
 *           type: string
 *           format: date-time
 *           description: A data da criação da matrícula.
 *         alunoId:
 *           type: integer
 *           description: O ID do aluno a ser matriculado.
 *         cursoId:
 *           type: integer
 *           description: O ID do curso da matrícula.
 *
 *     MatriculaComRelacionamentos:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         dataMatricula:
 *           type: string
 *           format: date-time
 *         alunoId:
 *           type: integer
 *         cursoId:
 *           type: integer
 *         aluno:
 *           $ref: '#/components/schemas/Aluno'
 *         curso:
 *           $ref: '#/components/schemas/Curso'
 *
 * tags:
 *   - name: Cursos
 *     description: API para gerenciamento de cursos
 *   - name: Alunos
 *     description: API para gerenciamento de alunos
 *   - name: Matrículas
 *     description: API para gerenciamento de matrículas
 */

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Lista todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: A lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 */
router.get('/', cursoController.listarCursos);

/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Cria um novo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *           example:
 *             nome: "Curso de Docker"
 *     responses:
 *       201:
 *         description: O curso foi criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 */
router.post('/', cursoController.criarCurso);

/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     summary: Busca um curso pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do curso
 *     responses:
 *       200:
 *         description: Os dados do curso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Curso não encontrado
 */
router.get('/:id', cursoController.buscarCursoPorId);

/**
 * @swagger
 * /cursos/{id}:
 *   put:
 *     summary: Atualiza um curso pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *           example:
 *             nome: "Curso de Docker Avançado"
 *     responses:
 *       200:
 *         description: O curso foi atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Curso não encontrado
 */
router.put('/:id', cursoController.atualizarCurso);

/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Deleta um curso pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do curso
 *     responses:
 *       204:
 *         description: Curso deletado com sucesso
 *       404:
 *         description: Curso não encontrado
 */
router.delete('/:id', cursoController.deletarCurso);

module.exports = router;
