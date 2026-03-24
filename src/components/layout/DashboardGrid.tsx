import React, { memo } from 'react';
import { IWidgetConfig } from '../../types';
import { WidgetRenderer } from '../widgets/WidgetRenderer';
import './DashboardGrid.css';

interface DashboardGridProps {
  configs: IWidgetConfig[];
}

/**
 * Reads widget configs and places them into a responsive CSS grid.
 * colSpan (1–3) drives how many columns each widget occupies.
 * All layout logic lives here — widgets are layout-unaware.
 */
export const DashboardGrid: React.FC<DashboardGridProps> = memo(({ configs }) => {
  if (configs.length === 0) return null;

  return (
    <div className="dashboard-grid">
      {configs.map((config) => (
        <div
          key={config.id}
          className="dashboard-grid__cell"
          style={{ gridColumn: `span ${config.colSpan ?? 1}` }}
        >
          <WidgetRenderer config={config} />
        </div>
      ))}
    </div>
  );
});

DashboardGrid.displayName = 'DashboardGrid';
