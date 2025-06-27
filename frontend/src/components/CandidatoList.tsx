import React, { useState, useEffect } from 'react';
import { ICandidato, ICandidatoFilters } from '../types/candidato';

/**
 * Props del componente CandidatoList
 */
interface CandidatoListProps {
  candidatos: ICandidato[];
  onEdit: (candidato: ICandidato) => void;
  onDelete: (id: number) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

/**
 * Componente de lista de candidatos
 * Implementa búsqueda, filtrado y paginación
 */
const CandidatoList: React.FC<CandidatoListProps> = ({
  candidatos,
  onEdit,
  onDelete,
  onRefresh,
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCandidatos, setFilteredCandidatos] = useState<ICandidato[]>(candidatos);
  const [currentPage, setCurrentPage] = useState(1);
  const [candidatosPerPage] = useState(10);

  // Filtrar candidatos cuando cambie la búsqueda o la lista
  useEffect(() => {
    const filtered = candidatos.filter(candidato =>
      candidato.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidato.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidato.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCandidatos(filtered);
    setCurrentPage(1); // Resetear a la primera página cuando se filtre
  }, [candidatos, searchTerm]);

  // Calcular candidatos para la página actual
  const indexOfLastCandidato = currentPage * candidatosPerPage;
  const indexOfFirstCandidato = indexOfLastCandidato - candidatosPerPage;
  const currentCandidatos = filteredCandidatos.slice(indexOfFirstCandidato, indexOfLastCandidato);
  const totalPages = Math.ceil(filteredCandidatos.length / candidatosPerPage);

  /**
   * Formatea la fecha de creación
   */
  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Trunca el texto si es muy largo
   */
  const truncateText = (text: string | undefined, maxLength: number): string => {
    if (!text) return 'N/A';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="space-y-6">
      {/* Header con búsqueda y botón de refresh */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 max-w-md">
          <label htmlFor="search" className="sr-only">
            Buscar candidatos
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Buscar por nombre, apellido o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="btn-secondary flex items-center gap-2"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isLoading ? 'Actualizando...' : 'Actualizar'}
        </button>
      </div>

      {/* Información de resultados */}
      <div className="text-sm text-secondary-600">
        Mostrando {currentCandidatos.length} de {filteredCandidatos.length} candidatos
        {searchTerm && ` para "${searchTerm}"`}
      </div>

      {/* Lista de candidatos */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : currentCandidatos.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-secondary-900">No se encontraron candidatos</h3>
          <p className="mt-1 text-sm text-secondary-500">
            {searchTerm ? 'Intenta con otros términos de búsqueda.' : 'Comienza añadiendo un nuevo candidato.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden shadow-soft rounded-lg">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Candidato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Educación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {currentCandidatos.map((candidato) => (
                <tr key={candidato.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-700">
                            {candidato.nombre.charAt(0)}{candidato.apellido.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-secondary-900">
                          {candidato.nombre} {candidato.apellido}
                        </div>
                        <div className="text-sm text-secondary-500">
                          {truncateText(candidato.direccion, 30)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-900">{candidato.email}</div>
                    <div className="text-sm text-secondary-500">{candidato.telefono || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-secondary-900">
                      {truncateText(candidato.educacion, 40)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    {formatDate(candidato.creadoEn)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEdit(candidato)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(candidato.id!)}
                        className="text-error-600 hover:text-error-900"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-secondary-700">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatoList; 