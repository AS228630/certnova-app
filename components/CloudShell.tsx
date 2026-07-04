'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, Copy } from 'lucide-react';
import { useLabStore, type CliLine } from '@/lib/store/labStore';

interface CloudShellProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function CloudShell({ isExpanded, onToggle }: CloudShellProps) {
  const { cliLog, runCliCommand } = useLabStore();
  const [inputValue, setInputValue] = useState('');
  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when logs update
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [cliLog]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      runCliCommand(inputValue);
      setInputValue('');
    }
  };

  const handleClear = () => {
    useLabStore.setState({ cliLog: [] });
    setInputValue('');
  };

  const copyToClipboard = () => {
    const text = cliLog.map((line) => {
      if (line.type === 'cmd') return `$ ${line.text}`;
      return line.text;
    }).join('\n');
    navigator.clipboard.writeText(text);
  };

  const getLineColor = (line: CliLine) => {
    switch (line.type) {
      case 'cmd':
        return 'text-[#4fc3f7]';
      case 'out':
        return 'text-[#d4d4d4]';
      case 'err':
        return 'text-[#ff6b6b]';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-t border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4fc3f7]"></div>
          <span className="text-xs font-semibold text-[#d4d4d4]">Cloud Shell</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="p-1.5 hover:bg-[#3e3e42] rounded transition"
            title="Copy output"
          >
            <Copy size={14} className="text-[#d4d4d4]" />
          </button>
          <button
            onClick={handleClear}
            className="p-1.5 hover:bg-[#3e3e42] rounded transition"
            title="Clear"
          >
            <Trash2 size={14} className="text-[#d4d4d4]" />
          </button>
          <button
            onClick={onToggle}
            className="p-1.5 hover:bg-[#3e3e42] rounded transition"
          >
            {isExpanded ? (
              <ChevronDown size={16} className="text-[#d4d4d4]" />
            ) : (
              <ChevronUp size={16} className="text-[#d4d4d4]" />
            )}
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      {isExpanded && (
        <>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs bg-black">
            {cliLog.length === 0 ? (
              <div className="text-[#6a6a6a]">
                <p>Microsoft Azure Cloud Shell (Simulation)</p>
                <p className="mt-2">
                  Beispiele: <span className="text-[#4fc3f7]">az group create --name CC-Lab-RG --location westeurope</span>
                </p>
                <p className="text-[#4fc3f7] mt-2">az storage account create --name certcoachstorage --resource-group CC-Lab-RG --location westeurope</p>
              </div>
            ) : (
              <>
                {cliLog.map((line, idx) => (
                  <div
                    key={idx}
                    className={`${getLineColor(line)} whitespace-pre-wrap break-words leading-relaxed`}
                  >
                    {line.type === 'cmd' ? `$ ${line.text}` : line.text}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 bg-[#1e1e1e] border-t border-gray-700"
          >
            <span className="text-[#4fc3f7] font-mono text-xs flex-shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="az group create --name CC-Lab-RG --location westeurope"
              className="flex-1 bg-transparent text-[#d4d4d4] font-mono text-xs outline-none placeholder:text-[#6a6a6a]"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-[#0078d4] hover:bg-[#005a9e] text-white text-xs rounded transition font-semibold"
            >
              Execute
            </button>
          </form>

          {/* Command Suggestions */}
          <div className="px-4 py-2 bg-[#252526] border-t border-gray-700 text-[10px] text-[#8b8b8b]">
            <p className="mb-1">
              <span className="text-[#4fc3f7]">Verfügbare Befehle:</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>• az group create</div>
              <div>• az group list</div>
              <div>• az group delete</div>
              <div>• az storage account create</div>
              <div>• az storage account list</div>
              <div>• clear (Bildschirm löschen)</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
