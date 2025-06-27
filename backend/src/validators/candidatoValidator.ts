import Joi from 'joi';
import { ICandidatoCreate, ICandidatoUpdate } from '../types/candidato';

/**
 * Esquemas de validación para candidatos usando Joi
 * Implementa validación estricta y sanitización de datos
 */

// Esquema base para validación de email
const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .max(150)
  .required()
  .messages({
    'string.email': 'El formato del email no es válido',
    'string.max': 'El email no puede exceder 150 caracteres',
    'any.required': 'El email es obligatorio'
  });

// Esquema para crear candidato
export const createCandidatoSchema = Joi.object<ICandidatoCreate>({
  nombre: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.min': 'El nombre no puede estar vacío',
      'string.max': 'El nombre no puede exceder 100 caracteres',
      'any.required': 'El nombre es obligatorio'
    }),
  apellido: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.min': 'El apellido no puede estar vacío',
      'string.max': 'El apellido no puede exceder 100 caracteres',
      'any.required': 'El apellido es obligatorio'
    }),
  email: emailSchema,
  telefono: Joi.string()
    .max(20)
    .optional()
    .allow('')
    .messages({
      'string.max': 'El teléfono no puede exceder 20 caracteres'
    }),
  direccion: Joi.string()
    .max(200)
    .optional()
    .allow('')
    .messages({
      'string.max': 'La dirección no puede exceder 200 caracteres'
    }),
  educacion: Joi.string()
    .max(200)
    .optional()
    .allow('')
    .messages({
      'string.max': 'La educación no puede exceder 200 caracteres'
    }),
  experiencia: Joi.string()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'La experiencia no puede exceder 500 caracteres'
    }),
  cvUrl: Joi.string()
    .max(300)
    .optional()
    .allow('')
    .messages({
      'string.max': 'La URL del CV no puede exceder 300 caracteres'
    })
});

// Esquema para actualizar candidato (todos los campos opcionales)
export const updateCandidatoSchema = Joi.object<ICandidatoUpdate>({
  nombre: Joi.string()
    .min(1)
    .max(100)
    .optional()
    .messages({
      'string.min': 'El nombre no puede estar vacío',
      'string.max': 'El nombre no puede exceder 100 caracteres'
    }),
  apellido: Joi.string()
    .min(1)
    .max(100)
    .optional()
    .messages({
      'string.min': 'El apellido no puede estar vacío',
      'string.max': 'El apellido no puede exceder 100 caracteres'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(150)
    .optional()
    .messages({
      'string.email': 'El formato del email no es válido',
      'string.max': 'El email no puede exceder 150 caracteres'
    }),
  telefono: Joi.string()
    .max(20)
    .optional()
    .allow('')
    .messages({
      'string.max': 'El teléfono no puede exceder 20 caracteres'
    }),
  direccion: Joi.string()
    .max(200)
    .optional()
    .allow('')
    .messages({
      'string.max': 'La dirección no puede exceder 200 caracteres'
    }),
  educacion: Joi.string()
    .max(200)
    .optional()
    .allow('')
    .messages({
      'string.max': 'La educación no puede exceder 200 caracteres'
    }),
  experiencia: Joi.string()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'La experiencia no puede exceder 500 caracteres'
    }),
  cvUrl: Joi.string()
    .max(300)
    .optional()
    .allow('')
    .messages({
      'string.max': 'La URL del CV no puede exceder 300 caracteres'
    })
});

/**
 * Valida los datos de un candidato a crear
 * @param data Datos del candidato
 * @returns Resultado de la validación
 */
export const validateCreateCandidato = (data: any) => {
  return createCandidatoSchema.validate(data, { abortEarly: false });
};

/**
 * Valida los datos de un candidato a actualizar
 * @param data Datos del candidato
 * @returns Resultado de la validación
 */
export const validateUpdateCandidato = (data: any) => {
  return updateCandidatoSchema.validate(data, { abortEarly: false });
}; 