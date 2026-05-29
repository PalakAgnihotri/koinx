import { useState, useEffect, useMemo } from "react";
import { fetchHoldings, fetchCapitalGains } from "../services/api";

export const useHarvestingData = () => {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [h, cg] = await Promise.all([fetchHoldings(), fetchCapitalGains()]);
        setHoldings(h);
        setCapitalGains(cg.capitalGains);
      } catch (e) {
        setError("Failed to load data. Please refresh and try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleSelection = (index) => {
    setSelectedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const toggleAll = (visibleIndices) => {
    const allSelected = visibleIndices.every((i) => selectedIndices.has(i));
    setSelectedIndices((prev) => {
      const next = new Set(prev);
      if (allSelected) visibleIndices.forEach((i) => next.delete(i));
      else visibleIndices.forEach((i) => next.add(i));
      return next;
    });
  };

  // Derive post-harvesting gains from selected holdings
  const postHarvestingGains = useMemo(() => {
    if (!capitalGains) return null;

    let stcgProfits = capitalGains.stcg.profits;
    let stcgLosses  = capitalGains.stcg.losses;
    let ltcgProfits = capitalGains.ltcg.profits;
    let ltcgLosses  = capitalGains.ltcg.losses;

    for (const idx of selectedIndices) {
      const h = holdings[idx];
      if (!h) continue;
      // STCG
      if (h.stcg.gain > 0) stcgProfits += h.stcg.gain;
      else if (h.stcg.gain < 0) stcgLosses += Math.abs(h.stcg.gain);
      // LTCG
      if (h.ltcg.gain > 0) ltcgProfits += h.ltcg.gain;
      else if (h.ltcg.gain < 0) ltcgLosses += Math.abs(h.ltcg.gain);
    }

    return {
      stcg: { profits: stcgProfits, losses: stcgLosses },
      ltcg: { profits: ltcgProfits, losses: ltcgLosses },
    };
  }, [capitalGains, selectedIndices, holdings]);

  const preRealised = capitalGains
    ? (capitalGains.stcg.profits - capitalGains.stcg.losses) +
      (capitalGains.ltcg.profits - capitalGains.ltcg.losses)
    : 0;

  const postRealised = postHarvestingGains
    ? (postHarvestingGains.stcg.profits - postHarvestingGains.stcg.losses) +
      (postHarvestingGains.ltcg.profits - postHarvestingGains.ltcg.losses)
    : 0;

  const savings = preRealised > postRealised ? preRealised - postRealised : 0;

  return {
    holdings,
    capitalGains,
    postHarvestingGains,
    selectedIndices,
    toggleSelection,
    toggleAll,
    loading,
    error,
    savings,
  };
};
