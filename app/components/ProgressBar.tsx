import { useState, useEffect } from "react";

interface ProgressBarProps {
  sold: number;
  total: number;
  className?: string;
}

export default function ProgressBar({ sold, total }: ProgressBarProps) {
  const percentage = Math.min((sold / total) * 100, 100);

  return (
    <div className={`progress-container`}>
      <div className="progress-header">
        <p>
          <span className="progress-label">Boletas vendidas: </span>
          <span className="progress-numbers">{sold}/{total}</span>
        </p>
      </div>
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
        <div className="progress-bar-bg" />
      </div>
    </div>
  );
}
