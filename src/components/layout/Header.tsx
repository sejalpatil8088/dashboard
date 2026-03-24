import React, { memo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useFilter, PLATFORMS } from '../../hooks/useFilter';
import { TabId } from '../../types';
import './Header.css';
import { LayoutDashboard } from 'lucide-react';

interface TabConfig {
  id: TabId;
  label: string;
  icon?: string;
}

const TABS: TabConfig[] = [
  { id: 'Overview', label: 'Overview' },
  { id: 'Traffic', label: 'Traffic' },
  { id: 'Conversion', label: 'Conversion' },
  { id: 'Operations', label: 'Operations' },
  { id: 'AI Insights', label: 'AI Insights', icon: '✦' },
];

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const Header: React.FC<HeaderProps> = memo(({ activeTab, onTabChange }) => {
  const { filters, setPlatform } = useFilter();
 const [activeSubTab, setActiveSubTab] = React.useState('MRP');
  const [isDateOpen, setIsDateOpen] = React.useState(false);
const [selectedDate, setSelectedDate] = React.useState('This Week');

  return (
    <header className="app-header">
      <div className="header-container">

        {/* 🔹 Title + Controls */}
        <div className="header-top-row">
          <div>
          <div className="header-title-row">
 <button className="sidebar-toggle-btn" aria-label="Toggle sidebar">
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="4"
      stroke="#6b7280"
      strokeWidth="2"
    />
    <line
      x1="9"
      y1="3"
      x2="9"
      y2="21"
      stroke="#6b7280"
      strokeWidth="2"
    />
  </svg>
</button>
  <div className="header-divider" />
  <h1 className="header-title">Category Analysis</h1>
</div>
            <div className="header-meta">
              <span className="header-product-info">Health Supplements +3</span>
              <span className="header-product-count">Total Products: 120</span>
            </div>
          </div>

          {/* Controls */}
          <div className="header-controls">
            <div className="date-range">
    <div className="date-range__top">
      <span>Sun - Sat &nbsp; {filters.dateRange.startDate} - {filters.dateRange.endDate}</span>
      {/* <span className="date-range__arrow">⌄</span> */}
    </div>
    <div className="date-range__compare">Compare: 25 May - 31 May 2025</div>
  </div>

            <select
    className="platform-select"
    value={filters.platform}
    onChange={(e) => setPlatform(e.target.value)}
  >
    {PLATFORMS.map((p) => (
      <option key={p}>{p}</option>
    ))}
  </select>

            <button className="filter-btn">
    <span className="filter-icon">≡</span>
    Filters
    <span className="filter-count">5</span>
  </button>
          </div>
        </div>

        {/* 🔹 Breadcrumb */}
     
        <nav className="breadcrumb">
          <span>Breadcrumb</span>
          <span className="sep">›</span>
          <span>Breadcrumb</span>
          <span className="sep">›</span>
          <span className="active">Breadcrumb</span>
        </nav>

        {/* 🔹 Tabs */}
        <div className="tab-row">

  {/* LEFT SIDE - Tabs */}
  <div className="tab-nav">
    {TABS.map(({ id, label, icon }) => (
      <button
        key={id}
        className={`tab-btn ${activeTab === id ? 'active' : ''} ${id === 'AI Insights' ? 'ai' : ''}`}
        onClick={() => onTabChange(id)}
      >
        {icon && <span className="icon">{icon}</span>}
        {id === 'AI Insights' ? <span className="ai-label">{label}</span> : label}
      </button>
    ))}
  </div>


<div className="sub-tab-group">


  <div className="price-toggle">
  {['MRP', 'SP'].map((t, index) => (
    <button
      key={t}
      className={`price-tab ${activeSubTab === t ? 'active' : ''}`}
      onClick={() => setActiveSubTab(t)}
    >
      {t}
    </button>
  ))}
</div>
  <select
    className="value-dropdown"
    value={activeSubTab}
    onChange={(e) => setActiveSubTab(e.target.value)}
  >
    <option value="By Value">By Value</option>
    <option value="By Volume">By Volume</option>
    <option value="By Sales">By Sales</option>
  </select>

</div>

</div>

      </div>
    </header>
  );
});

Header.displayName = 'Header';