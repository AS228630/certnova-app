'use client';

import React, { useState, useEffect } from 'react';
import { 
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  Terminal,
} from 'lucide-react';
import {
  Home24Regular,
  Board24Regular,
  Folder24Regular,
  Database24Regular,
  VirtualNetwork24Regular,
  Apps24Regular,
  Search24Regular,
  Settings24Regular,
  QuestionCircle24Regular,
} from '@fluentui/react-icons';

interface AzureLabSimulatorProps {
  labId: string;
  labTitle: string;
  labDescription: string;
  level: string;
  duration: string;
  tasks: { id: string; label: string; done: boolean }[];
  resources: { id: string; label: string; active: boolean }[];
  instructions: string[];
  details: { label: string; value: string }[];
  goal: string;
  goalChecklist: string[];
}

export default function AzureLabSimulator({
  labId,
  labTitle,
  labDescription,
  level,
  duration,
  tasks,
  resources,
  instructions,
  details,
  goal,
  goalChecklist,
}: AzureLabSimulatorProps) {
  const [timeRemaining, setTimeRemaining] = useState(1 * 3600 + 59 * 60 + 32); // 01:59:32
  const [completedTasks, setCompletedTasks] = useState(tasks.filter(t => t.done).length);
  const [showCloudShell, setShowCloudShell] = useState(false);
  const [progress, setProgress] = useState(80);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="w-full">
      {/* Lab Header */}
      <div className="bg-panel border border-border-soft rounded-xl px-6 py-4 mb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <p className="text-xs text-text-faint mb-1">Labs {'>'} Microsoft Azure {'>'} AZ-900</p>
              <h1 className="text-xl font-bold text-text">{labTitle}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-panel-alt px-4 py-2 rounded-lg border border-border-soft">
              <span className="text-xs text-text-faint">Verbleibende Zeit</span>
              <span className="text-lg font-bold text-warning">{formatTime(timeRemaining)}</span>
            </div>
            <button className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger/80 font-semibold text-sm">
              Lab beenden
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {['Online-Lab', 'Sichere Umgebung', 'Reset möglich', 'Auto-Validierung', 'Schritt-für-Schritt-Anleitung'].map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:h-[calc(100vh-200px)] lg:min-h-[600px]">
        {/* Left Panels */}
        <div className="flex flex-col gap-4 lg:col-span-3 lg:overflow-y-auto xl:col-span-2">
          {/* Goal Checklist */}
          <div className="bg-panel border border-border-soft rounded-lg p-4">
            <h3 className="font-bold text-text mb-3 text-sm">Ziel des Labs</h3>
            <p className="text-xs text-text-muted mb-3">{goal}</p>
            <ul className="space-y-2">
              {goalChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-text-muted">
                  <CheckCircle2 size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lab Details */}
          <div className="bg-panel border border-border-soft rounded-lg p-4">
            <h3 className="font-bold text-text mb-3 text-sm">Lab-Details</h3>
            <div className="space-y-2">
              {details.map((detail, idx) => (
                <div key={idx} className="text-xs">
                  <p className="text-text-faint">{detail.label}</p>
                  <p className="text-text font-semibold">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-panel border border-border-soft rounded-lg p-4">
            <h3 className="font-bold text-text mb-3 text-sm">Lab-Anweisungen</h3>
            <ol className="space-y-2">
              {instructions.map((instr, idx) => (
                <li key={idx} className="text-xs text-text-muted flex gap-2">
                  <span className="font-bold text-primary flex-shrink-0">{idx + 1}.</span>
                  <span>{instr}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Center - Azure Portal Window (Light Mode) */}
        <div className="flex min-h-[520px] flex-col overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-2xl lg:col-span-7 xl:col-span-8">
          {/* Portal Header - Azure Blue */}
          <div className="bg-[#0078d4] text-white px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-[#0078d4] font-bold text-xs">A</span>
              </div>
              <span className="font-semibold text-sm">Microsoft Azure</span>
            </div>
            <div className="hidden items-center gap-3 flex-1 mx-6 sm:flex">
              <Search24Regular primaryFill="rgba(255,255,255,0.6)" />
              <input 
                type="text" 
                placeholder="Nach Ressourcen, Services und Docs suchen..." 
                className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-1 text-sm placeholder:text-white/60 text-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-white/20 rounded">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Portal Content - Light Mode */}
          <div className="flex flex-1 overflow-hidden bg-white">
            {/* Portal Sidebar - Light with Fluent Icons */}
            <div className="w-40 shrink-0 bg-[#f2f2f2] border-r border-gray-300 overflow-y-auto sm:w-56">
              <div className="p-4">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white text-[#323130] text-sm font-medium transition">
                  <Home24Regular primaryFill="#0078d4" />
                  <span>Home</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white text-[#323130] text-sm font-medium transition mt-1">
                  <Board24Regular primaryFill="#7FBA00" />
                  <span>Dashboard</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white text-[#323130] text-sm font-medium transition mt-1 border-l-4 border-[#0078d4]">
                  <Folder24Regular primaryFill="#0078d4" />
                  <span>Ressourcengruppen</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white text-[#323130] text-sm font-medium transition mt-1">
                  <Database24Regular primaryFill="#005a9e" />
                  <span>Speicherkonten</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white text-[#323130] text-sm font-medium transition mt-1">
                  <VirtualNetwork24Regular primaryFill="#f25022" />
                  <span>Virtuelle Computer</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white text-[#323130] text-sm font-medium transition mt-1">
                  <Apps24Regular primaryFill="#7fba00" />
                  <span>Alle Dienste</span>
                </button>
              </div>
            </div>

            {/* Portal Main Content - Light */}
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#0f1222] mb-2">Ressourcengruppen</h2>
                <p className="text-sm text-[#5b6178]">Erstellen und verwalten Sie Ressourcengruppen</p>
              </div>

              {/* Create Button */}
              <button className="px-4 py-2 bg-[#0078d4] text-white rounded-lg hover:bg-[#106ebe] font-medium text-sm mb-6 flex items-center gap-2">
                <span>+ Erstellen</span>
              </button>

              {/* Content Area */}
              <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                <div className="text-center text-[#5b6178]">
                  <Folder24Regular primaryFill="rgb(209, 211, 212)" className="mx-auto mb-4" style={{ width: 48, height: 48 }} />
                  <p className="font-medium">Keine Ressourcengruppen gefunden</p>
                  <p className="text-sm mt-1">Erstellen Sie eine neue Ressourcengruppe, um zu beginnen</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cloud Shell at Bottom */}
          <div className="bg-[#1e1e1e] text-[#d4d4d4] border-t border-gray-300 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Terminal size={16} className="text-[#4fc3f7]" />
              <span className="text-xs font-mono">Cloud Shell</span>
              <button 
                onClick={() => setShowCloudShell(!showCloudShell)}
                className="ml-auto text-xs hover:text-white"
              >
                {showCloudShell ? '▼' : '▶'}
              </button>
            </div>
            {showCloudShell && (
              <div className="bg-black rounded p-2 max-h-24 overflow-y-auto">
                <div className="font-mono text-xs">
                  <div className="text-[#4fc3f7]">PS /home/user&gt; <span className="text-white">az group list</span></div>
                  <div className="text-[#d4d4d4] mt-1">[</div>
                  <div className="text-[#d4d4d4]">  {'{'}...</div>
                  <div className="text-[#d4d4d4]">]</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panels */}
        <div className="flex flex-col gap-4 lg:col-span-2 lg:overflow-y-auto xl:col-span-2">
          {/* Resources Status */}
          <div className="bg-panel border border-border-soft rounded-lg p-4">
            <h3 className="font-bold text-text mb-3 text-sm">Labressourcen</h3>
            <div className="space-y-2">
              {resources.map((res) => (
                <div key={res.id} className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${res.active ? 'bg-success' : 'bg-text-faint'}`}></div>
                  <span className="text-text-muted flex-1">{res.label}</span>
                  <span className={`text-[10px] font-semibold ${res.active ? 'text-success' : 'text-text-faint'}`}>
                    {res.active ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks Checklist */}
          <div className="bg-panel border border-border-soft rounded-lg p-4">
            <h3 className="font-bold text-text mb-3 text-sm">Aufgaben-Checklist</h3>
            <div className="space-y-2 mb-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={task.done}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className={`text-xs ${task.done ? 'line-through text-text-faint' : 'text-text-muted'}`}>
                    {task.label}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-semibold transition">
              Ergebnisse validieren
            </button>
          </div>

          {/* Lab Status */}
          <div className="bg-panel border border-border-soft rounded-lg p-4">
            <h3 className="font-bold text-text mb-3 text-sm">Lab-Status</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-faint">Fortschritt</span>
                  <span className="text-primary font-semibold">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-panel-alt rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-panel-alt rounded p-2">
                  <p className="text-[10px] text-text-faint">Punkte</p>
                  <p className="text-sm font-bold text-text">80 / 100</p>
                </div>
                <div className="bg-panel-alt rounded p-2">
                  <p className="text-[10px] text-text-faint">Versuche</p>
                  <p className="text-sm font-bold text-text">1 / 3</p>
                </div>
              </div>
              <div className="text-[10px] text-text-faint">
                Letzter Reset: Heute, 10:00
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-panel border border-border-soft rounded-lg p-4">
            <h3 className="font-bold text-text mb-3 text-sm flex items-center gap-2">
              <QuestionCircle24Regular primaryFill="currentColor" />
              Dokumentation & Hilfe
            </h3>
            <div className="space-y-2">
              <a href="#" className="block text-xs text-primary hover:underline">
                Was ist eine Ressourcengruppe?
              </a>
              <a href="#" className="block text-xs text-primary hover:underline">
                az group create Referenz
              </a>
              <a href="#" className="block text-xs text-primary hover:underline">
                Support kontaktieren
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
