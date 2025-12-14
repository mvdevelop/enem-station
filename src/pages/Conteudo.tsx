
'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import type { ENEMData, AreasConhecimento, Materia, Subtopico } from '../types/types';

export default function ConteudoPage() {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedMateria, setSelectedMateria] = useState<string>('');
  const [selectedSubtopico, setSelectedSubtopico] = useState<Subtopico | null>(null);
  const [enemData, setEnemData] = useState<ENEMData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRedacao, setShowRedacao] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/data/Materias.json');
      const data = await response.json();
      setEnemData(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMateria = (area: string, materia: string) => {
    setSelectedArea(area);
    setSelectedMateria(materia);
    setSelectedSubtopico(null);
    setShowRedacao(false);
  };

  const handleSelectRedacao = () => {
    setShowRedacao(true);
    setSelectedArea('Redacao');
    setSelectedMateria('');
    setSelectedSubtopico(null);
  };

  const getCurrentMateria = (): Materia | null => {
    if (!enemData || !selectedArea || !selectedMateria) return null;
    
    const area = enemData.ENEM.AreasConhecimento.find(a => a.nome === selectedArea);
    if (!area) return null;
    
    return area.materias.find(m => m.nome === selectedMateria) || null;
  };

  const getAreaStats = () => {
    if (!enemData) return null;
    
    const area = enemData.ENEM.AreasConhecimento.find(a => a.nome === selectedArea);
    if (!area) return null;
    
    return {
      totalMaterias: area.materias.length,
      totalSubtopics: area.materias.reduce((acc, m) => acc + m.subtopicos.length, 0)
    };
  };

  const materia = getCurrentMateria();
  const areaStats = getAreaStats();

  const renderMateriaContent = () => {
    if (!materia) return null;

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/30 to-gray-900 rounded-xl p-6 border border-blue-800/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{materia.nome}</h1>
              <p className="text-blue-300">{selectedArea}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{materia.subtopicos.length}</div>
                <div className="text-sm text-gray-400">Subtópicos</div>
              </div>
              <div className="h-10 w-px bg-gray-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {areaStats?.totalMaterias || 0}
                </div>
                <div className="text-sm text-gray-400">Matérias na área</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtópicos Grid */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Subtópicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materia.subtopicos.map((subtopico, index) => (
              <button
                key={index}
                onClick={() => setSelectedSubtopico(subtopico)}
                className={`text-left bg-gray-900 border rounded-lg p-4 hover:border-blue-500 transition-all duration-200 ${
                  selectedSubtopico?.nome === subtopico.nome
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-gray-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-900/40 text-blue-300 rounded-lg flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{subtopico.nome}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {subtopico.conteudo}
                    </p>
                    <div className="mt-3 flex items-center text-xs text-blue-400">
                      <span>Ver conteúdo completo →</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSubtopicoDetail = () => {
    if (!selectedSubtopico) return null;

    return (
      <div className="mt-8 animate-fadeIn">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{selectedSubtopico.nome}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{materia?.nome}</span>
                <span>•</span>
                <span>{selectedArea.split(',')[0]}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedSubtopico(null)}
              className="text-gray-400 hover:text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">Conteúdo Resumido</h3>
              <p className="text-gray-300 leading-relaxed">
                {selectedSubtopico.conteudo}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-800/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-400 mb-2">Importância no ENEM</h4>
                <p className="text-sm text-gray-300">
                  Este tópico aparece frequentemente nas questões. Recomenda-se atenção especial.
                </p>
              </div>
              <div className="bg-gray-800/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2">Dica de Estudo</h4>
                <p className="text-sm text-gray-300">
                  Faça exercícios específicos e revise os principais conceitos regularmente.
                </p>
              </div>
              <div className="bg-gray-800/30 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">Tempo Estimado</h4>
                <p className="text-sm text-gray-300">
                  Recomendamos dedicar 2-3 horas para dominar este conteúdo completamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRedacao = () => {
    if (!enemData || !showRedacao) return null;

    const { Redacao, estatisticas } = enemData.ENEM;

    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900/30 to-gray-900 rounded-xl p-6 border border-red-800/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Redação ENEM</h1>
              <p className="text-red-300">Até {estatisticas.pontuacao_maxima} pontos na sua nota</p>
            </div>
          </div>
        </div>

        {/* Características e Competências */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
              Características
            </h2>
            <ul className="space-y-3">
              {Redacao.caracteristicas.map((caracteristica, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">{caracteristica}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
              Competências Avaliadas
            </h2>
            <div className="space-y-4">
              {Redacao.competencias.map((competencia, index) => (
                <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-blue-400 mb-1">{competencia.nome}</h3>
                  <p className="text-sm text-gray-300">{competencia.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Estrutura e Dicas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Estrutura da Redação</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-400 mb-2">Introdução</h3>
                <p className="text-gray-300">{Redacao.estrutura.introducao}</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-400 mb-2">Desenvolvimento</h3>
                <p className="text-gray-300">{Redacao.estrutura.desenvolvimento}</p>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-400 mb-2">Conclusão</h3>
                <p className="text-gray-300">{Redacao.estrutura.conclusao}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Dicas Importantes</h2>
            <div className="space-y-3">
              {Redacao.dicas.map((dica, index) => (
                <div key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-900/30 text-red-400 rounded-full flex items-center justify-center text-sm mr-3">
                    {index + 1}
                  </span>
                  <p className="text-gray-300">{dica}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    if (!enemData) return null;

    const { estatisticas } = enemData.ENEM;

    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900/30 rounded-xl p-8 border border-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-24 h-24 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z M12 14v6l9-5M12 20l-9-5" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Conteúdo ENEM</h1>
            <p className="text-xl text-gray-300 mb-6">
              Estude de forma organizada e completa para o Exame Nacional do Ensino Médio
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{estatisticas.total_areas}</div>
            <div className="text-sm text-gray-400">Áreas do Conhecimento</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{estatisticas.total_materias}</div>
            <div className="text-sm text-gray-400">Matérias</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{estatisticas.total_subtopicos}</div>
            <div className="text-sm text-gray-400">Subtópicos</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{estatisticas.pontuacao_maxima}</div>
            <div className="text-sm text-gray-400">Pontos na Redação</div>
          </div>
        </div>

        {/* Areas Overview */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Áreas do Conhecimento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {enemData.ENEM.AreasConhecimento.map((area, index) => {
              const totalMaterias = area.materias.length;
              const totalSubtopics = area.materias.reduce((acc, m) => acc + m.subtopicos.length, 0);
              
              const colors = [
                'from-blue-900/30 to-blue-900/10',
                'from-green-900/30 to-green-900/10',
                'from-yellow-900/30 to-yellow-900/10',
                'from-purple-900/30 to-purple-900/10'
              ];

              return (
                <button
                  key={index}
                  onClick={() => {
                    const firstMateria = area.materias[0];
                    if (firstMateria) {
                      handleSelectMateria(area.nome, firstMateria.nome);
                    }
                  }}
                  className={`bg-gradient-to-br ${colors[index]} border border-gray-800 rounded-xl p-5 text-left hover:border-gray-700 transition-all duration-200 group`}
                >
                  <h3 className="font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {area.nome.split(',')[0]}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Matérias:</span>
                      <span className="text-white font-semibold">{totalMaterias}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtópicos:</span>
                      <span className="text-white font-semibold">{totalSubtopics}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Questões:</span>
                      <span className="text-white font-semibold">
                        {estatisticas.questoes_por_area[area.nome.split(',')[0] as keyof typeof estatisticas.questoes_por_area] || 45}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-blue-900/20 to-gray-900 border border-blue-800/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Dica de Estudo
          </h3>
          <p className="text-gray-300">
            Organize seu tempo de estudo intercalando as áreas do conhecimento. 
            Dedique pelo menos 2 horas por dia, focando em uma matéria diferente a cada sessão. 
            Não se esqueça de praticar a redação semanalmente!
          </p>
        </div>
      </div>
    );
  };

  const getPageTitle = () => {
    if (showRedacao) return 'Redação ENEM';
    if (selectedSubtopico) return selectedSubtopico.nome;
    if (materia) return materia.nome;
    return 'Conteúdo ENEM';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            onSelectMateria={handleSelectMateria}
            onSelectRedacao={handleSelectRedacao}
            selectedArea={selectedArea}
            selectedMateria={selectedMateria}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Mobile Header */}
          <div className="md:hidden mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">{getPageTitle()}</h1>
              <button className="text-gray-400 hover:text-white p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {showRedacao && renderRedacao()}
              {!showRedacao && materia && renderMateriaContent()}
              {!showRedacao && !materia && renderDashboard()}
              {renderSubtopicoDetail()}
            </>
          )}
        </main>
      </div>

      {/* Mobile Menu Modal */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
