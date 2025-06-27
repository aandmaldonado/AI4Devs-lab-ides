/**
 * Tipos e interfaces para el dominio de Candidatos en el frontend
 * Mantiene consistencia con los tipos del backend
 */

export interface ICandidato {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  direccion?: string;
  educacion?: string;
  experiencia?: string;
  cvUrl?: string;
  creadoEn?: Date;
}

export interface ICandidatoCreate {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  direccion?: string;
  educacion?: string;
  experiencia?: string;
  cvUrl?: string;
}

export interface ICandidatoUpdate {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  educacion?: string;
  experiencia?: string;
  cvUrl?: string;
}

/**
 * Respuesta estándar de la API
 */
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  fieldErrors?: { [key: string]: string };
}

/**
 * Filtros para búsqueda de candidatos
 */
export interface ICandidatoFilters {
  nombre?: string;
  apellido?: string;
  email?: string;
  limit?: number;
  offset?: number;
}

/**
 * Estado del formulario
 */
export interface IFormState {
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
}

/**
 * Errores de validación del formulario
 */
export interface IFormErrors {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  educacion?: string;
  experiencia?: string;
  cv?: string;
} 