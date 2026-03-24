import React, { memo } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { IWidgetConfig, ITopCardData } from '../../types';
import { useWidgetData } from '../../hooks/useWidgetData';
import { useFilter } from '../../hooks/useFilter';
import { Skeleton } from '../ui/Skeleton';
import { ErrorState } from '../ui/ErrorState';
import './TopCard.css';

interface TopCardProps {
  config: IWidgetConfig;
}

export const TopCard: React.FC<TopCardProps> = memo(({ config }) => {
  const { filters } = useFilter();
  const { data, status, error, refetch } = useWidgetData<ITopCardData>(
    config.dataSource,
    filters
  );

  if (status === 'idle' || status === 'loading') {
    return (
      <div className="top-card top-card--loading" aria-busy="true">
        <Skeleton height={10} width="50%" borderRadius={3} />
        <Skeleton height={32} width="40%" borderRadius={6} />
        <Skeleton height={50} borderRadius={4} />
      </div>
    );
  }

  if (status === 'error' || !data) {
    return (
      <div className="top-card">
        <ErrorState message={error ?? 'Failed to load data'} onRetry={refetch} />
      </div>
    );
  }

  const isUp = data.trendDirection === 'up';
  const strokeColor = isUp ? '#16a34a' : '#dc2626';
  const trendColor = isUp ? '#16a34a' : '#dc2626';

  return (
    <div className="top-card" role="region" aria-label={config.title}>
      {/* TREND BADGE — top right */}
      <div className="top-card__trend">
        {isUp ? (
          <TrendingUp size={13} color={trendColor} strokeWidth={2.2} />
        ) : (
          <TrendingDown size={13} color={trendColor} strokeWidth={2.2} />
        )}
        <span className="top-card__trend-value" style={{ color: trendColor }}>
          {data.trend}
        </span>
      </div>

      {/* HEADER */}
      <div className="top-card__header">
        <span className="top-card__title">{config.title}</span>
        {data.label && (
          <span className="top-card__label">{data.label}</span>
        )}
      </div>

      {/* BODY: value + sparkline */}
      <div className="top-card__body">
        <span className="top-card__value">{data.value}</span>

        <div className="top-card__sparkline">
          <ResponsiveContainer width="100%" height={60}>
            <AreaChart data={data.sparkline}>
              <Tooltip contentStyle={{ display: 'none' }} cursor={false} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={strokeColor}
                fill={strokeColor}
                fillOpacity={0.1}
                strokeWidth={1.8}
                isAnimationActive
                animationDuration={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
});

TopCard.displayName = 'TopCard';