import React, { memo, useState } from 'react';
import './SectionHeader.css';
import { Radio, TrendingUp } from 'lucide-react';

type ViewMode = 'beacon' | 'trends';

const VIEW_OPTIONS: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
  { id: 'beacon', label: 'Beacon', icon: <Radio size={14} className="btn-icon" /> },
  { id: 'trends', label: 'Trends', icon: <TrendingUp size={14} className="btn-icon" /> },
];

export const SectionHeader: React.FC = memo(() => {

  const [activeView, setActiveView] = useState<ViewMode>('beacon');

  return (
    <div className="section-header">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="50%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#486eec" />
      </linearGradient>
    </defs>
  </svg>
      <h2 className="section-header__title">Performance Overview</h2>
      <div className="view-toggle" role="group" aria-label="View mode">
        {VIEW_OPTIONS.map(({ id, label, icon }) => (
          <button
  key={id}
  className={`view-btn ${activeView === id ? 'active' : ''}`}
  onClick={() => setActiveView(id)}
>
  {icon}
  <span>{label}</span>
</button>
        ))}
      </div>
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';
