import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CandidatoForm from './components/CandidatoForm';
import CandidatoList from './components/CandidatoList';
import { ICandidato, ICandidatoCreate, ICandidatoUpdate } from './types/candidato';
import apiService from './services/api';

/**
 * Componente principal de la aplicación ATS
 * Maneja el estado global y la lógica de negocio
 */
function App() {
  const [candidatos, setCandidatos] = useState<ICandidato[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCandidato, setEditingCandidato] = useState<ICandidato | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Carga los candidatos desde la API
   */
  const loadCandidatos = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getCandidatos();
      if (response.success && response.data) {
        setCandidatos(response.data);
      } else {
        toast.error(response.message || 'Error al cargar candidatos');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Crea un nuevo candidato
   */
  const handleCreateCandidato = async (data: ICandidatoCreate) => {
    setIsSubmitting(true);
    try {
      const response = await apiService.createCandidato(data);
      if (response.success) {
        toast.success('Candidato creado exitosamente');
        setShowForm(false);
        loadCandidatos(); // Recargar la lista
      } else {
        toast.error(response.message || 'Error al crear candidato');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al crear candidato');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Actualiza un candidato existente
   */
  const handleUpdateCandidato = async (data: ICandidatoUpdate) => {
    if (!editingCandidato?.id) return;
    
    setIsSubmitting(true);
    try {
      const response = await apiService.updateCandidato(editingCandidato.id, data);
      if (response.success) {
        toast.success('Candidato actualizado exitosamente');
        setShowForm(false);
        setEditingCandidato(null);
        loadCandidatos(); // Recargar la lista
      } else {
        toast.error(response.message || 'Error al actualizar candidato');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al actualizar candidato');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Elimina un candidato
   */
  const handleDeleteCandidato = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este candidato?')) {
      return;
    }

    try {
      const response = await apiService.deleteCandidato(id);
      if (response.success) {
        toast.success('Candidato eliminado exitosamente');
        loadCandidatos(); // Recargar la lista
      } else {
        toast.error(response.message || 'Error al eliminar candidato');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al eliminar candidato');
    }
  };

  /**
   * Maneja la edición de un candidato
   */
  const handleEditCandidato = (candidato: ICandidato) => {
    setEditingCandidato(candidato);
    setShowForm(true);
  };

  /**
   * Maneja la cancelación del formulario
   */
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCandidato(null);
  };

  /**
   * Maneja el envío del formulario (crear o actualizar)
   */
  const handleFormSubmit = async (data: ICandidatoCreate | ICandidatoUpdate) => {
    if (editingCandidato) {
      await handleUpdateCandidato(data as ICandidatoUpdate);
    } else {
      await handleCreateCandidato(data as ICandidatoCreate);
    }
  };

  // Cargar candidatos al montar el componente
  useEffect(() => {
    loadCandidatos();
  }, []);

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900">
                Sistema ATS
              </h1>
              <p className="text-secondary-600">
                Gestión de Candidatos
              </p>
            </div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary flex items-center gap-2"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Añadir Candidato
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <CandidatoForm
            candidato={editingCandidato || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
            isSubmitting={isSubmitting}
          />
        ) : (
          <CandidatoList
            candidatos={candidatos}
            onEdit={handleEditCandidato}
            onDelete={handleDeleteCandidato}
            onRefresh={loadCandidatos}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
