import { Router } from 'express';
import { CandidatoController } from '../controllers/candidatoController';
import multer from 'multer';

/**
 * Router para endpoints de candidatos
 * Implementa rutas RESTful siguiendo las mejores prácticas
 */
const router = Router();
const candidatoController = new CandidatoController();
const upload = multer();

// POST /candidatos - Crear nuevo candidato
router.post('/', upload.single('cv'), candidatoController.createCandidato.bind(candidatoController));

// GET /candidatos - Obtener todos los candidatos (con filtros opcionales)
router.get('/', candidatoController.getCandidatos.bind(candidatoController));

// GET /candidatos/:id - Obtener candidato por ID
router.get('/:id', candidatoController.getCandidatoById.bind(candidatoController));

// PUT /candidatos/:id - Actualizar candidato existente
router.put('/:id', upload.single('cv'), candidatoController.updateCandidato.bind(candidatoController));

// DELETE /candidatos/:id - Eliminar candidato
router.delete('/:id', candidatoController.deleteCandidato.bind(candidatoController));

export default router; 