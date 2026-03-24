import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  height?: number | string;
  width?: number | string;
  borderRadius?: number | string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  height = 20,
  width = '100%',
  borderRadius = 4,
}) => (
  <div
    className="skeleton"
    style={{
      height,
      width,
      borderRadius,
    }}
  />
);
