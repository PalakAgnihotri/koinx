import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => (
  <div className="ls-wrap" role="status" aria-label="Loading data">
    <div className="ls-ring" />
    <p className="ls-text">Loading portfolio data…</p>
  </div>
);

export default LoadingSpinner;
