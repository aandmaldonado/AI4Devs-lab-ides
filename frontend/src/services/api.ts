import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ICandidato, ICandidatoCreate, ICandidatoUpdate, ICandidatoFilters, IApiResponse } from '../types/candidato';

/**
 * Configuración de la API
 * Centraliza la comunicación con el backend
 */
class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3010/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para requests
    this.api.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Interceptor para responses
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('API Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Obtiene todos los candidatos con filtros opcionales
   */
  async getCandidatos(filters: ICandidatoFilters = {}): Promise<IApiResponse<ICandidato[]>> {
    try {
      const response = await this.api.get('/candidatos', { params: filters });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene un candidato por su ID
   */
  async getCandidatoById(id: number): Promise<IApiResponse<ICandidato>> {
    try {
      const response = await this.api.get(`/candidatos/${id}`);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Crea un nuevo candidato
   */
  async createCandidato(candidato: ICandidatoCreate): Promise<IApiResponse<ICandidato>> {
    try {
      const response = await this.api.post('/candidatos', candidato);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Actualiza un candidato existente
   */
  async updateCandidato(id: number, candidato: ICandidatoUpdate): Promise<IApiResponse<ICandidato>> {
    try {
      const response = await this.api.put(`/candidatos/${id}`, candidato);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Elimina un candidato
   */
  async deleteCandidato(id: number): Promise<IApiResponse<void>> {
    try {
      const response = await this.api.delete(`/candidatos/${id}`);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Sube un archivo CV
   */
  async uploadCV(file: File): Promise<IApiResponse<{ cvUrl: string }>> {
    try {
      const formData = new FormData();
      formData.append('cv', file);

      const response = await this.api.post('/candidatos/upload-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Maneja errores de la API de manera consistente
   */
  private handleError(error: any): Error {
    if (error.response) {
      // Error de respuesta del servidor
      const { data, status } = error.response;
      const message = data?.message || `Error ${status}: ${data?.error || 'Error desconocido'}`;
      return new Error(message);
    } else if (error.request) {
      // Error de red
      return new Error('Error de conexión. Verifica tu conexión a internet.');
    } else {
      // Error de configuración
      return new Error('Error de configuración de la aplicación.');
    }
  }

  /**
   * Verifica el estado de salud de la API
   */
  async healthCheck(): Promise<IApiResponse> {
    try {
      const response = await this.api.get('/health');
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }
}

// Exportar instancia singleton
export const apiService = new ApiService();
export default apiService; 