
'use client';

import { useState, useEffect } from 'react';
import type { AreasConhecimento } from '@/types/types';

interface SidebarProps {
  onSelectMateria: (area: string, materia: string) => void;
  onSelectRedacao: () => void;
  selectedArea?: string;
  selectedMateria?: string;
}

export default function Sidebar({ 
  onSelectMateria, 
  onSelectRedacao, 
  selectedArea, 
  selectedMateria 
}: SidebarProps) {
  const [areas, setAreas] = useState<AreasConhecimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedAreas, setExpandedAreas] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/data/Materias.json');
      const data = await response.json();
      setAreas(data.ENEM.AreasConhecimento);
      
      // Inicializar todas as áreas como expandidas
      const initialExpanded: Record<string, boolean> = {};
      data.ENEM.AreasConhecimento.forEach((area: AreasConhecimento) => {
        initialExpanded[area.nome] = true;
      });
      setExpandedAreas(initialExpanded);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleArea = (areaNome: string) => {
    setExpandedAreas(prev => ({
      ...prev,
      [areaNome]: !prev[areaNome]
    }));
  };

  const handleSelectMateria = (areaNome: string, materiaNome: string) => {
    onSelectMateria(areaNome, materiaNome);
  };

  const filteredAreas = areas.filter(area => {
    if (!searchTerm) return true;
    
    const areaMatch = area.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const materiasMatch = area.materias.some(materia => 
      materia.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return areaMatch || materiasMatch;
  });

  if (loading) {
    return (
      <aside className="w-64 bg-gray-900 border-r border-gray-800 h-full overflow-y-auto">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i}>
                <div className="h-4 bg-gray-800 rounded w-32 mb-3"></div>
                <div className="space-y-2 ml-2">
                  <div className="h-3 bg-gray-800 rounded w-full"></div>
                  <div className="h-3 bg-gray-800 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-800 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 h-full overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Matérias ENEM</h2>
          <p className="text-sm text-gray-400">
            Navegue pelo conteúdo completo
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar matéria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg 
              className="absolute right-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6 p-3 bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Total de matérias:</span>
            <span className="font-bold text-blue-400">
              {areas.reduce((acc, area) => acc + area.materias.length, 0)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-300">Áreas:</span>
            <span className="font-bold text-green-400">{areas.length}</span>
          </div>
        </div>

        {/* Areas List */}
        <div className="space-y-4">
          {filteredAreas.map((area) => (
            <div key={area.nome} className="border-b border-gray-800 pb-4 last:border-0">
              <button
                onClick={() => toggleArea(area.nome)}
                className="flex items-center justify-between w-full text-left mb-2"
              >
                <h3 className="text-sm font-semibold text-gray-300 uppercase">
                  {area.nome.split(',')[0]}
                </h3>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedAreas[area.nome] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedAreas[area.nome] && (
                <ul className="space-y-1">
                  {area.materias.map((materia) => {
                    const isSelected = selectedArea === area.nome && selectedMateria === materia.nome;
                    return (
                      <li key={materia.nome}>
                        <button
                          onClick={() => handleSelectMateria(area.nome, materia.nome)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{materia.nome}</span>
                            <span className="text-xs bg-gray-700 px-1.5 py-0.5 rounded">
                              {materia.subtopicos.length}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}

          {/* Redação */}
          <div className="pt-4 border-t border-gray-800">
            <button
              onClick={onSelectRedacao}
              className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                selectedArea === 'Redacao'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-900/30 text-red-300 hover:bg-red-900/50 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-semibold">Redação ENEM</span>
                </div>
                <span className="text-xs bg-red-700 px-1.5 py-0.5 rounded">1000 pts</span>
              </div>
              <p className="text-xs mt-1 opacity-80">Até 1000 pontos na sua nota</p>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
