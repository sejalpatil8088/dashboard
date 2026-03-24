import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { FilterProvider } from './hooks/useFilter';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { SectionHeader } from './components/layout/SectionHeader';
import { DashboardGrid } from './components/layout/DashboardGrid';
import { IWidgetConfig, TabId } from './types';
import dashboardConfig from './config/dashboardConfig.json';
import './App.css';

// Cast once at the app boundary — all consumers get the typed interface
const WIDGET_CONFIGS = dashboardConfig as IWidgetConfig[];

function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('Overview');

  // Partition configs into logical rows — avoids conditional layout logic in JSX
  const { topCards, restWidgets } = useMemo(() => ({
    topCards:    WIDGET_CONFIGS.filter((c) => c.type === 'topCard'),
    restWidgets: WIDGET_CONFIGS.filter((c) => c.type !== 'topCard'),
  }), []);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="app-content" role="main">
          <section className="performance-panel" aria-label="Performance Overview panel">
            <SectionHeader />
            <DashboardGrid configs={topCards} />
            <DashboardGrid configs={restWidgets} />
          </section>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <Dashboard />
      </FilterProvider>
    </ThemeProvider>
  );
}

export default App;
