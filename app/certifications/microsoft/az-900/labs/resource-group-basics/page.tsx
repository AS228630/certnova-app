'use client';

import React, { useEffect } from 'react';
import DashboardShell from '@/components/DashboardShell';
import AzureLabSimulator from '@/components/AzureLabSimulator';
import { getLab } from '@/lib/labsData';
import { useLabStore } from '@/lib/store/labStore';

export default function AZ900ResourceGroupLabPage() {
  const labData = getLab('az-900', 'Azure Fundamentals', 'Beginner');
  const store = useLabStore();

  useEffect(() => {
    // Initialize lab on mount
    store.reset();
  }, []);

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 w-full h-screen overflow-hidden bg-bg">
        <AzureLabSimulator
          labId={labData.id}
          labTitle={labData.title}
          labDescription={labData.description}
          level={labData.level}
          duration={labData.durationLabel}
          tasks={labData.tasks}
          resources={labData.resources}
          instructions={labData.instructions}
          details={labData.details}
          goal={labData.goal}
          goalChecklist={labData.goalChecklist}
        />
      </main>
    </DashboardShell>
  );
}
