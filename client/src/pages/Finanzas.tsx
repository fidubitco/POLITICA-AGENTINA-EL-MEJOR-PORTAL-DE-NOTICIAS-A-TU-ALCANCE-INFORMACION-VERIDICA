import { useState, useEffect } from 'react';
import { BBCHeader } from '../components/BBCHeader';
import { MegaSEO } from '../components/MegaSEO';
import { PremiumCard, PremiumBadge, PremiumButton } from '../components/ui/premium';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Sparkles,
  RefreshCw,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface FinancialData {
  dolarOficial: { compra: number; venta: number; variacion: number };
  dolarBlue: { compra: number; venta: number; variacion: number };
  dolarMEP: { compra: number; venta: number; variacion: number };
  dolarCCL: { compra: number; venta: number; variacion: number };
  euro: { compra: number; venta: number; variacion: number };
  real: { compra: number; venta: number; variacion: number };
  merval: { valor: number; variacion: number };
  riesgo_pais: { valor: number; variacion: number };
  inflacion: { mensual: number; anual: number };
}

interface AIAnalysis {
  summary: string;
  predictions: string[];
  recommendations: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

export const Finanzas = () => {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [aiAnalysis, setAIAnalysis] = useState<AIAnalysis | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    loadFinancialData();
    loadHistoricalData();
    
    // Auto-refresh cada 5 minutos
    const interval = setInterval(() => {
      loadFinancialData();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const loadFinancialData = async () => {
    setLoading(true);
    try {
      // Mock data (reemplazar con API real de DolarAPI, BCRA, etc.)
      const mockData: FinancialData = {
        dolarOficial: { compra: 850, venta: 890, variacion: 0.5 },
        dolarBlue: { compra: 1180, venta: 1200, variacion: -2.3 },
        dolarMEP: { compra: 1150, venta: 1165, variacion: 1.2 },
        dolarCCL: { compra: 1170, venta: 1185, variacion: 0.8 },
        euro: { compra: 950, venta: 980, variacion: 0.3 },
        real: { compra: 180, venta: 190, variacion: -0.5 },
        merval: { valor: 1850000, variacion: 3.5 },
        riesgo_pais: { valor: 1850, variacion: -50 },
        inflacion: { mensual: 12.8, anual: 211.4 },
      };

      setFinancialData(mockData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error cargando datos financieros:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadHistoricalData = async () => {
    try {
      // Mock historical data para gráficos
      const mockHistorical = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('es-AR', {
          day: '2-digit',
          month: '2-digit',
        }),
        dolarBlue: 1100 + Math.random() * 100 + i * 3,
        dolarOficial: 800 + Math.random() * 50 + i * 2,
        merval: 1700000 + Math.random() * 100000 + i * 5000,
      }));

      setHistoricalData(mockHistorical);
    } catch (error) {
      console.error('Error cargando datos históricos:', error);
    }
  };

  const analyzeWithAI = async () => {
    setAnalyzing(true);
    try {
      // Simular análisis con IA (reemplazar con llamada real a API de IA)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockAnalysis: AIAnalysis = {
        summary:
          'El mercado argentino muestra señales mixtas. El dólar blue mantiene una tendencia alcista moderada, mientras que el Merval registra ganancias significativas. El riesgo país ha disminuido, lo que indica mayor confianza de los inversores.',
        predictions: [
          'Se espera que el dólar blue continúe su tendencia alcista en el corto plazo (+2-3%)',
          'El Merval podría consolidarse en niveles actuales con volatilidad moderada',
          'La brecha cambiaria podría reducirse levemente en las próximas semanas',
          'El riesgo país tiene potencial de seguir bajando si se mantienen las políticas actuales',
        ],
        recommendations: [
          'Diversificar inversiones entre activos en dólares y pesos',
          'Considerar bonos del tesoro argentino para inversores de riesgo moderado',
          'Mantener liquidez en moneda extranjera ante volatilidad cambiaria',
          'Evaluar oportunidades en acciones del Merval con fundamentals sólidos',
        ],
        sentiment: 'neutral',
        confidence: 78,
      };

      setAIAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Error analizando con IA:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const renderVariation = (variacion: number) => {
    const isPositive = variacion >= 0;
    return (
      <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span className="font-semibold">{Math.abs(variacion).toFixed(2)}%</span>
      </div>
    );
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-100';
      case 'negative':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MegaSEO
        title="Finanzas y Economía - Política Argentina"
        description="Cotizaciones en tiempo real del dólar, euro, Merval, riesgo país y análisis con IA."
      />

      <BBCHeader />

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <DollarSign className="text-green-600" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Finanzas y Economía</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cotizaciones en tiempo real y análisis con Inteligencia Artificial
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Última actualización: {lastUpdate.toLocaleTimeString('es-AR')}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Cargando datos financieros...</p>
          </div>
        ) : financialData ? (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Dólar Blue */}
              <PremiumCard className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Dólar Blue</h3>
                  <DollarSign size={24} />
                </div>
                <p className="text-3xl font-bold mb-2">${financialData.dolarBlue.venta}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Compra: ${financialData.dolarBlue.compra}</span>
                  {renderVariation(financialData.dolarBlue.variacion)}
                </div>
              </PremiumCard>

              {/* Dólar Oficial */}
              <PremiumCard className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Dólar Oficial</h3>
                  <DollarSign size={24} />
                </div>
                <p className="text-3xl font-bold mb-2">${financialData.dolarOficial.venta}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Compra: ${financialData.dolarOficial.compra}</span>
                  {renderVariation(financialData.dolarOficial.variacion)}
                </div>
              </PremiumCard>

              {/* Merval */}
              <PremiumCard className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Merval</h3>
                  <TrendingUp size={24} />
                </div>
                <p className="text-3xl font-bold mb-2">
                  {financialData.merval.valor.toLocaleString()}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Índice bursátil</span>
                  {renderVariation(financialData.merval.variacion)}
                </div>
              </PremiumCard>

              {/* Riesgo País */}
              <PremiumCard className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Riesgo País</h3>
                  <BarChart3 size={24} />
                </div>
                <p className="text-3xl font-bold mb-2">{financialData.riesgo_pais.valor}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Puntos básicos</span>
                  {renderVariation(financialData.riesgo_pais.variacion)}
                </div>
              </PremiumCard>
            </div>

            {/* Detailed Cotizaciones */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cotizaciones */}
              <PremiumCard>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Cotizaciones Detalladas</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Dólar MEP', data: financialData.dolarMEP },
                    { name: 'Dólar CCL', data: financialData.dolarCCL },
                    { name: 'Euro', data: financialData.euro },
                    { name: 'Real', data: financialData.real },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          Compra: ${item.data.compra} | Venta: ${item.data.venta}
                        </p>
                      </div>
                      {renderVariation(item.data.variacion)}
                    </div>
                  ))}
                </div>
              </PremiumCard>

              {/* Inflación */}
              <PremiumCard>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Inflación</h3>
                <div className="space-y-6">
                  <div className="p-6 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="text-red-600" size={20} />
                      <h4 className="font-semibold text-gray-900">Mensual</h4>
                    </div>
                    <p className="text-4xl font-bold text-red-600">
                      {financialData.inflacion.mensual}%
                    </p>
                  </div>
                  <div className="p-6 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="text-orange-600" size={20} />
                      <h4 className="font-semibold text-gray-900">Anual</h4>
                    </div>
                    <p className="text-4xl font-bold text-orange-600">
                      {financialData.inflacion.anual}%
                    </p>
                  </div>
                </div>
              </PremiumCard>
            </div>

            {/* Historical Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Dólar Blue Historical */}
              <PremiumCard>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Evolución Dólar Blue (30 días)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={historicalData}>
                    <defs>
                      <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => `$${value.toFixed(0)}`} />
                    <Area
                      type="monotone"
                      dataKey="dolarBlue"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorBlue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </PremiumCard>

              {/* Merval Historical */}
              <PremiumCard>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Evolución Merval (30 días)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => value.toLocaleString()} />
                    <Line
                      type="monotone"
                      dataKey="merval"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </PremiumCard>
            </div>

            {/* AI Analysis */}
            <PremiumCard className="bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-purple-600" size={28} />
                  <h3 className="text-2xl font-bold text-gray-900">Análisis con IA</h3>
                </div>
                <PremiumButton
                  onClick={analyzeWithAI}
                  disabled={analyzing}
                  icon={analyzing ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                >
                  {analyzing ? 'Analizando...' : 'Analizar'}
                </PremiumButton>
              </div>

              {aiAnalysis ? (
                <div className="space-y-6">
                  {/* Sentiment */}
                  <div className="flex items-center gap-4">
                    <PremiumBadge className={getSentimentColor(aiAnalysis.sentiment)}>
                      Sentimiento: {aiAnalysis.sentiment === 'positive' ? 'Positivo' : aiAnalysis.sentiment === 'negative' ? 'Negativo' : 'Neutral'}
                    </PremiumBadge>
                    <PremiumBadge variant="info">
                      Confianza: {aiAnalysis.confidence}%
                    </PremiumBadge>
                  </div>

                  {/* Summary */}
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Resumen</h4>
                    <p className="text-gray-700">{aiAnalysis.summary}</p>
                  </div>

                  {/* Predictions */}
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Predicciones</h4>
                    <ul className="space-y-2">
                      {aiAnalysis.predictions.map((prediction, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <TrendingUp className="text-blue-600 mt-1 flex-shrink-0" size={16} />
                          <span className="text-gray-700">{prediction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Recomendaciones</h4>
                    <ul className="space-y-2">
                      {aiAnalysis.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="text-purple-600 mt-1 flex-shrink-0" size={16} />
                          <span className="text-gray-700">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Sparkles className="mx-auto text-purple-400 mb-4" size={48} />
                  <p className="text-gray-600 mb-4">
                    Haz clic en "Analizar" para obtener un análisis detallado con IA
                  </p>
                </div>
              )}
            </PremiumCard>
          </div>
        ) : (
          <div className="text-center py-20">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
            <p className="text-xl text-gray-600">Error cargando datos financieros</p>
          </div>
        )}
      </div>
    </div>
  );
};

