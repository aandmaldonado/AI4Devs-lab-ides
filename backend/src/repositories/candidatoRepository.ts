import { PrismaClient } from '@prisma/client';
import { ICandidato, ICandidatoCreate, ICandidatoUpdate, ICandidatoFilters } from '../types/candidato';
import Database from '../config/database';
import logger from '../config/logger';

/**
 * Repositorio para operaciones de candidatos
 * Implementa el patrón Repository para abstraer el acceso a datos
 * Siguiendo principios SOLID y clean code
 */
export class CandidatoRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = Database.getInstance();
  }

  /**
   * Crea un nuevo candidato en la base de datos
   * @param candidatoData Datos del candidato a crear
   * @returns Candidato creado
   */
  async create(candidatoData: ICandidatoCreate): Promise<ICandidato> {
    try {
      logger.info('Creando nuevo candidato', { email: candidatoData.email });
      
      const candidato = await this.prisma.candidato.create({
        data: candidatoData
      });

      logger.info('Candidato creado exitosamente', { id: candidato.id });
      return candidato;
    } catch (error) {
      logger.error('Error al crear candidato', { error, email: candidatoData.email });
      throw error;
    }
  }

  /**
   * Obtiene todos los candidatos con filtros opcionales
   * @param filters Filtros de búsqueda
   * @returns Lista de candidatos
   */
  async findAll(filters: ICandidatoFilters = {}): Promise<ICandidato[]> {
    try {
      logger.info('Obteniendo candidatos', { filters });
      
      const where: any = {};
      
      if (filters.nombre) {
        where.nombre = { contains: filters.nombre, mode: 'insensitive' };
      }
      
      if (filters.apellido) {
        where.apellido = { contains: filters.apellido, mode: 'insensitive' };
      }
      
      if (filters.email) {
        where.email = { contains: filters.email, mode: 'insensitive' };
      }

      const candidatos = await this.prisma.candidato.findMany({
        where,
        take: filters.limit || 50,
        skip: filters.offset || 0,
        orderBy: { creadoEn: 'desc' }
      });

      logger.info('Candidatos obtenidos exitosamente', { count: candidatos.length });
      return candidatos;
    } catch (error) {
      logger.error('Error al obtener candidatos', { error });
      throw error;
    }
  }

  /**
   * Obtiene un candidato por su ID
   * @param id ID del candidato
   * @returns Candidato encontrado o null
   */
  async findById(id: number): Promise<ICandidato | null> {
    try {
      logger.info('Buscando candidato por ID', { id });
      
      const candidato = await this.prisma.candidato.findUnique({
        where: { id }
      });

      if (candidato) {
        logger.info('Candidato encontrado', { id });
      } else {
        logger.warn('Candidato no encontrado', { id });
      }

      return candidato;
    } catch (error) {
      logger.error('Error al buscar candidato por ID', { error, id });
      throw error;
    }
  }

  /**
   * Actualiza un candidato existente
   * @param id ID del candidato a actualizar
   * @param candidatoData Datos a actualizar
   * @returns Candidato actualizado
   */
  async update(id: number, candidatoData: ICandidatoUpdate): Promise<ICandidato> {
    try {
      logger.info('Actualizando candidato', { id });
      
      const candidato = await this.prisma.candidato.update({
        where: { id },
        data: candidatoData
      });

      logger.info('Candidato actualizado exitosamente', { id });
      return candidato;
    } catch (error) {
      logger.error('Error al actualizar candidato', { error, id });
      throw error;
    }
  }

  /**
   * Elimina un candidato por su ID
   * @param id ID del candidato a eliminar
   * @returns true si se eliminó correctamente
   */
  async delete(id: number): Promise<boolean> {
    try {
      logger.info('Eliminando candidato', { id });
      
      await this.prisma.candidato.delete({
        where: { id }
      });

      logger.info('Candidato eliminado exitosamente', { id });
      return true;
    } catch (error) {
      logger.error('Error al eliminar candidato', { error, id });
      throw error;
    }
  }

  /**
   * Verifica si existe un candidato con el email especificado
   * @param email Email a verificar
   * @param excludeId ID del candidato a excluir (para updates)
   * @returns true si existe, false en caso contrario
   */
  async emailExists(email: string, excludeId?: number): Promise<boolean> {
    try {
      const where: any = { email };
      
      if (excludeId) {
        where.id = { not: excludeId };
      }

      const count = await this.prisma.candidato.count({ where });
      return count > 0;
    } catch (error) {
      logger.error('Error al verificar existencia de email', { error, email });
      throw error;
    }
  }
} 