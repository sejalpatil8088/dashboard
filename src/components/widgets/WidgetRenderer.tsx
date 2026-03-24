import React from 'react';
import { IWidgetConfig } from '../../types';
import { TopCard } from './TopCard';
import { MetricsGrid } from './MetricsGrid';
import { TableWidget } from './TableWidget';

interface WidgetRendererProps {
  config: IWidgetConfig;
}

/**
 * Config-driven widget factory.
 * Add new widget types here by mapping config.type to a component.
 */
export const WidgetRenderer: React.FC<WidgetRendererProps> = ({ config }) => {
  switch (config.type) {
    case 'topCard':
      return <TopCard config={config} />;
    case 'metricsGrid':
      return <MetricsGrid config={config} />;
    case 'table':
      return <TableWidget config={config} />;
    default:
      return (
        <div style={{ padding: 16, color: 'var(--color-text-muted)', fontSize: 12 }}>
          Unknown widget type: <strong>{(config as IWidgetConfig).type}</strong>
        </div>
      );
  }
};
