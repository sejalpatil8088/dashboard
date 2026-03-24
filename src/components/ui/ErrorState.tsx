import React from 'react';
import './ErrorState.css';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div className="error-state">
    <span className="error-icon">⚠</span>
    <p className="error-message">{message}</p>
    {onRetry && (
      <button className="error-retry" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
);
