import React from "react";
import { useHarvestingData } from "./hooks/useHarvestingData";
import CapitalGainsCard from "./components/CapitalGainsCard";
import HoldingsTable from "./components/HoldingsTable";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

function App() {
  const {
    holdings,
    capitalGains,
    postHarvestingGains,
    selectedIndices,
    toggleSelection,
    toggleAll,
    loading,
    error,
    savings,
  } = useHarvestingData();

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-logo">
            <span className="app-logo__koin">Koin</span>
            <span className="app-logo__x">X</span>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="app-main">
        {/* Page title */}
        <div className="app-page-header">
          <h1 className="app-page-title">Tax Loss Harvesting</h1>

          {/* Info banner */}
          <div className="app-info-banner" role="note">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{flexShrink:0,marginTop:'2px'}}>
              <circle cx="8" cy="8" r="7" stroke="#60a5fa" strokeWidth="1.5"/>
              <path d="M8 7v4M8 5v.5" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p>
              <strong>Important:</strong> Tax-loss harvesting involves selling assets at a loss to offset
              capital gains. The information shown here is for illustrative purposes only.
              Please consult a qualified tax advisor before making any financial decisions.
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Error */}
        {!loading && error && (
          <div className="app-error" role="alert">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="8" stroke="#f87171" strokeWidth="1.5"/>
              <path d="M9 5v5M9 12.5v.5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        {/* Content */}
        {!loading && !error && capitalGains && (
          <>
            {/* Capital gains cards */}
            <div className="app-cards">
              <CapitalGainsCard
                title="Pre Harvesting"
                gains={capitalGains}
                variant="pre"
              />
              <CapitalGainsCard
                title="After Harvesting"
                gains={postHarvestingGains}
                variant="post"
                savings={savings}
              />
            </div>

            {/* Holdings table */}
            <HoldingsTable
              holdings={holdings}
              selectedIndices={selectedIndices}
              onToggle={toggleSelection}
              onToggleAll={toggleAll}
            />
          </>
        )}
      </main>

      <footer className="app-footer">
        © {new Date().getFullYear()} KoinX. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
