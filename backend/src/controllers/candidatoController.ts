import { Request, Response } from 'express';
import { CandidatoService } from '../services/candidatoService';
import { ICandidatoCreate, ICandidatoUpdate, ICandidatoFilters } from '../types/candidato';
import logger from '../config/logger';

/**
 * Controlador de candidatos
 * Maneja las peticiones HTTP y delega la lógica de negocio al servicio
 * Implementa principios SOLID y clean code
 */
export class CandidatoController {
  private candidatoService: CandidatoService;

  constructor() {
    this.candidatoService = new CandidatoService();
  }

  /**
   * Crea un nuevo candidato
   * POST /candidatos
   */
  async createCandidato(req: Request, res: Response): Promise<void> {
    try {
      const candidatoData: ICandidatoCreate = req.body;
      
      logger.info('Petición para crear candidato recibida', { 
        email: candidatoData.email,
        ip: req.ip 
      });

      const result = await this.candidatoService.createCandidato(candidatoData);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Error en controlador al crear candidato', { error });
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: 'Error interno'
      });
    }
  }

  /**
   * Obtiene todos los candidatos con filtros opcionales
   * GET /candidatos
   */
  async getCandidatos(req: Request, res: Response): Promise<void> {
    try {
      const filters: ICandidatoFilters = {
        nombre: req.query.nombre as string,
        apellido: req.query.apellido as string,
        email: req.query.email as string,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined
      };

      logger.info('Petición para obtener candidatos recibida', { 
        filters,
        ip: req.ip 
      });

      const result = await this.candidatoService.getCandidatos(filters);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      logger.error('Error en controlador al obtener candidatos', { error });
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: 'Error interno'
      });
    }
  }

  /**
   * Obtiene un candidato por su ID
   * GET /candidatos/:id
   */
  async getCandidatoById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        logger.warn('ID de candidato inválido en petición', { id: req.params.id });
        res.status(400).json({
          success: false,
          message: 'ID de candidato inválido',
          error: 'ID inválido'
        });
        return;
      }

      logger.info('Petición para obtener candidato por ID recibida', { 
        id,
        ip: req.ip 
      });

      const result = await this.candidatoService.getCandidatoById(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      logger.error('Error en controlador al obtener candidato por ID', { error });
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: 'Error interno'
      });
    }
  }

  /**
   * Actualiza un candidato existente
   * PUT /candidatos/:id
   */
  async updateCandidato(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        logger.warn('ID de candidato inválido en petición de actualización', { id: req.params.id });
        res.status(400).json({
          success: false,
          message: 'ID de candidato inválido',
          error: 'ID inválido'
        });
        return;
      }

      const candidatoData: ICandidatoUpdate = req.body;

      logger.info('Petición para actualizar candidato recibida', { 
        id,
        email: candidatoData.email,
        ip: req.ip 
      });

      const result = await this.candidatoService.updateCandidato(id, candidatoData);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Error en controlador al actualizar candidato', { error });
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: 'Error interno'
      });
    }
  }

  /**
   * Elimina un candidato por su ID
   * DELETE /candidatos/:id
   */
  async deleteCandidato(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        logger.warn('ID de candidato inválido en petición de eliminación', { id: req.params.id });
        res.status(400).json({
          success: false,
          message: 'ID de candidato inválido',
          error: 'ID inválido'
        });
        return;
      }

      logger.info('Petición para eliminar candidato recibida', { 
        id,
        ip: req.ip 
      });

      const result = await this.candidatoService.deleteCandidato(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      logger.error('Error en controlador al eliminar candidato', { error });
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: 'Error interno'
      });
    }
  }
} 