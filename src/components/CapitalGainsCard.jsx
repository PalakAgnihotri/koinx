import React from "react";
import { formatCurrency } from "../utils/format";
import "./CapitalGainsCard.css";

const CapitalGainsCard = ({ title, gains, variant, savings }) => {
  if (!gains) return null;

  const stcgNet = gains.stcg.profits - gains.stcg.losses;
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses;
  const realised = stcgNet + ltcgNet;

  return (
    <div className={`cgcard cgcard--${variant}`}>
      <h3 className="cgcard__title">{title}</h3>

      <div className="cgcard__table">
        {/* Header row */}
        <div className="cgcard__row cgcard__row--header">
          <span className="cgcard__cell cgcard__cell--label" />
          <span className="cgcard__cell cgcard__cell--col">Short-Term</span>
          <span className="cgcard__cell cgcard__cell--col">Long-Term</span>
        </div>

        {/* Profits */}
        <div className="cgcard__row">
          <span className="cgcard__cell cgcard__cell--label">Profits</span>
          <span className="cgcard__cell cgcard__cell--val">
            {formatCurrency(gains.stcg.profits)}
          </span>
          <span className="cgcard__cell cgcard__cell--val">
            {formatCurrency(gains.ltcg.profits)}
          </span>
        </div>

        {/* Losses */}
        <div className="cgcard__row">
          <span className="cgcard__cell cgcard__cell--label">Losses</span>
          <span className="cgcard__cell cgcard__cell--val">
            {formatCurrency(gains.stcg.losses)}
          </span>
          <span className="cgcard__cell cgcard__cell--val">
            {formatCurrency(gains.ltcg.losses)}
          </span>
        </div>

        {/* Net Capital Gains */}
        <div className="cgcard__row">
          <span className="cgcard__cell cgcard__cell--label">Net Capital Gains</span>
          <span className={`cgcard__cell cgcard__cell--val ${stcgNet < 0 ? "val--neg" : "val--pos"}`}>
            {formatCurrency(stcgNet)}
          </span>
          <span className={`cgcard__cell cgcard__cell--val ${ltcgNet < 0 ? "val--neg" : "val--pos"}`}>
            {formatCurrency(ltcgNet)}
          </span>
        </div>
      </div>

      {/* Realised footer */}
      <div className="cgcard__footer">
        <span className="cgcard__realised-label">
          {variant === "post" ? "Effective Capital Gains:" : "Realised Capital Gains:"}
        </span>
        <span className={`cgcard__realised-val ${realised < 0 ? "val--neg" : ""}`}>
          {formatCurrency(realised)}
        </span>
      </div>

      {savings > 0 && (
        <div className="cgcard__savings">
          🎉 You're going to save {formatCurrency(savings)} in taxes!
        </div>
      )}
    </div>
  );
};

export default CapitalGainsCard;
