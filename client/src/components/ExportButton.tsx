import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { PremiumButton } from './ui/premium';

interface ExportButtonProps {
  type: 'articles' | 'analytics' | 'users';
  format: 'pdf' | 'excel';
  filters?: any;
  label?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  type,
  format,
  filters = {},
  label,
}) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);

    try {
      // Construir URL de exportación
      let url = `/api/export/${type}?format=${format}`;

      // Agregar filtros a la URL
      const params = new URLSearchParams(filters);
      if (params.toString()) {
        url += `&${params.toString()}`;
      }

      // Hacer request
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error exportando datos');
      }

      // Obtener blob
      const blob = await response.blob();

      // Crear URL temporal y descargar
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;

      // Nombre del archivo
      const timestamp = new Date().toISOString().split('T')[0];
      const extension = format === 'pdf' ? 'pdf' : 'xlsx';
      link.download = `${type}-${timestamp}.${extension}`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Limpiar URL temporal
      window.URL.revokeObjectURL(downloadUrl);

      console.log(`✅ ${type} exportado como ${format}`);
    } catch (error) {
      console.error('Error exportando:', error);
      alert('Error al exportar los datos');
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    if (format === 'pdf') {
      return <FileText size={18} />;
    }
    return <FileSpreadsheet size={18} />;
  };

  const getLabel = () => {
    if (label) return label;
    
    const typeLabels: { [key: string]: string } = {
      articles: 'Artículos',
      analytics: 'Analytics',
      users: 'Usuarios',
    };
    
    const formatLabels: { [key: string]: string } = {
      pdf: 'PDF',
      excel: 'Excel',
    };
    
    return `Exportar ${typeLabels[type]} (${formatLabels[format]})`;
  };

  return (
    <PremiumButton
      variant="secondary"
      size="sm"
      icon={getIcon()}
      iconPosition="left"
      onClick={handleExport}
      loading={loading}
    >
      {getLabel()}
    </PremiumButton>
  );
};

