import React, { useState, useRef } from "react";
import { formatPrice, formatSmallNumber, formatGain } from "../utils/format";
import "./HoldingsTable.css";

const DEFAULT_LOGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='32' height='32' rx='16' fill='%23333'/%3E%3Ctext x='16' y='21' text-anchor='middle' fill='%23aaa' font-size='11' font-family='sans-serif'%3E%3F%3C/text%3E%3C/svg%3E";

const PAGE_SIZE = 8;

const HoldingsTable = ({ holdings, selectedIndices, onToggle, onToggleAll }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleHoldings = showAll ? holdings : holdings.slice(0, PAGE_SIZE);
  const visibleIndices = visibleHoldings.map((_, i) => i);
  const allChecked =
    visibleIndices.length > 0 && visibleIndices.every((i) => selectedIndices.has(i));
  const someChecked = visibleIndices.some((i) => selectedIndices.has(i));

  const selectAllRef = useRef(null);
  if (selectAllRef.current) {
    selectAllRef.current.indeterminate = someChecked && !allChecked;
  }

  return (
    <div className="ht-section">
      <h2 className="ht-title">Holdings</h2>

      <div className="ht-wrapper">
        <table className="ht-table">
          <thead>
            <tr>
              <th className="ht-th ht-th--check">
                <input
                  type="checkbox"
                  ref={selectAllRef}
                  checked={allChecked}
                  onChange={() => onToggleAll(visibleIndices)}
                  aria-label="Select all"
                />
              </th>
              <th className="ht-th ht-th--asset">Asset</th>
              <th className="ht-th ht-th--num">
                Holdings<br />
                <span className="ht-subhead">Avg Buy Price</span>
              </th>
              <th className="ht-th ht-th--num">Current Price</th>
              <th className="ht-th ht-th--num">
                Short-Term<br />
                <span className="ht-subhead">Gain / Balance</span>
              </th>
              <th className="ht-th ht-th--num">
                Long-Term<br />
                <span className="ht-subhead">Gain / Balance</span>
              </th>
              <th className="ht-th ht-th--num">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((h, i) => {
              const isSelected = selectedIndices.has(i);
              return (
                <tr
                  key={`${h.coin}-${h.coinName}-${i}`}
                  className={`ht-row ${isSelected ? "ht-row--selected" : ""}`}
                  onClick={() => onToggle(i)}
                >
                  {/* Checkbox */}
                  <td
                    className="ht-td ht-td--check"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(i)}
                      aria-label={`Select ${h.coin}`}
                    />
                  </td>

                  {/* Asset */}
                  <td className="ht-td ht-td--asset">
                    <div className="ht-asset">
                      <img
                        className="ht-logo"
                        src={h.logo}
                        alt={h.coin}
                        onError={(e) => {
                          e.target.src = DEFAULT_LOGO;
                        }}
                      />
                      <div className="ht-asset-info">
                        <span className="ht-ticker">{h.coin}</span>
                        <span className="ht-name">{h.coinName}</span>
                      </div>
                    </div>
                  </td>

                  {/* Holdings / Avg Buy Price */}
                  <td className="ht-td ht-td--num">
                    <span className="ht-primary">
                      {formatSmallNumber(h.totalHolding)}&nbsp;{h.coin}
                    </span>
                    <span className="ht-secondary">
                      {formatPrice(h.averageBuyPrice)}/{h.coin}
                    </span>
                  </td>

                  {/* Current Price */}
                  <td className="ht-td ht-td--num">
                    <span className="ht-primary">{formatPrice(h.currentPrice)}</span>
                  </td>

                  {/* Short-Term Gain */}
                  <td className="ht-td ht-td--num">
                    <span
                      className={`ht-primary ${
                        h.stcg.gain >= 0 ? "ht-gain--pos" : "ht-gain--neg"
                      }`}
                    >
                      {formatGain(h.stcg.gain)}
                    </span>
                    <span className="ht-secondary">
                      {formatSmallNumber(h.stcg.balance)}&nbsp;{h.coin}
                    </span>
                  </td>

                  {/* Long-Term Gain */}
                  <td className="ht-td ht-td--num">
                    <span
                      className={`ht-primary ${
                        h.ltcg.gain >= 0 ? "ht-gain--pos" : "ht-gain--neg"
                      }`}
                    >
                      {formatGain(h.ltcg.gain)}
                    </span>
                    <span className="ht-secondary">
                      {formatSmallNumber(h.ltcg.balance)}&nbsp;{h.coin}
                    </span>
                  </td>

                  {/* Amount to Sell */}
                  <td className="ht-td ht-td--num">
                    {isSelected ? (
                      <span className="ht-primary ht-amount">
                        {formatSmallNumber(h.totalHolding)}
                      </span>
                    ) : (
                      <span className="ht-dash">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {holdings.length > PAGE_SIZE && (
        <button
          className="ht-view-all"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll
            ? "Show Less"
            : `View All ${holdings.length} Holdings`}
        </button>
      )}
    </div>
  );
};

export default HoldingsTable;
