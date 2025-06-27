import { Router } from 'express';
import { CandidatoController } from '../controllers/candidatoController';

/**
 * Router para endpoints de candidatos
 * Implementa rutas RESTful siguiendo las mejores prácticas
 */
const router = Router();
const candidatoController = new CandidatoController();

// POST /candidatos - Crear nuevo candidato
router.post('/', candidatoController.createCandidato.bind(candidatoController));

// GET /candidatos - Obtener todos los candidatos (con filtros opcionales)
router.get('/', candidatoController.getCandidatos.bind(candidatoController));

// GET /candidatos/:id - Obtener candidato por ID
router.get('/:id', candidatoController.getCandidatoById.bind(candidatoController));

// PUT /candidatos/:id - Actualizar candidato existente
router.put('/:id', candidatoController.updateCandidato.bind(candidatoController));

// DELETE /candidatos/:id - Eliminar candidato
router.delete('/:id', candidatoController.deleteCandidato.bind(candidatoController));

export default router; 