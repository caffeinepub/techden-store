import { useEffect, useState } from "react";
import { useCompare } from "../App";
import type { GpuType } from "../backend.d";
import { backend } from "../backendClient";
import { StarRating } from "../components/GpuCard";

export default function ComparePage() {
  const { compareIds, addToCompare, removeFromCompare, clearCompare } =
    useCompare();
  const [allGpus, setAllGpus] = useState<GpuType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    backend.getGpus().then((g) => {
      setAllGpus(g);
      setLoading(false);
    });
  }, []);

  const selectedGpus = compareIds
    .map((id) => allGpus.find((g) => g.id === id))
    .filter(Boolean) as GpuType[];

  const specs: [string, (g: GpuType) => string | number, string?][] = [
    ["Brand", (g) => g.brand],
    ["Series", (g) => g.series],
    ["VRAM", (g) => g.vram],
    ["Price (₹)", (g) => Number(g.price), "lower"],
    ["Performance", (g) => g.performanceRating, "higher"],
    ["Release Year", (g) => Number(g.releaseYear), "higher"],
    ["TDP (W)", (g) => Number(g.tdp), "lower"],
    ["Condition", (g) => g.condition],
  ];

  function getBest(key: string, gpus: GpuType[], prefer?: string): Set<number> {
    if (!prefer) return new Set();
    const spec = specs.find((s) => s[0] === key);
    if (!spec) return new Set();
    const values = gpus.map((g) => Number(spec[1](g)));
    const best = prefer === "lower" ? Math.min(...values) : Math.max(...values);
    const bestSet = new Set<number>();
    values.forEach((v, i) => {
      if (v === best) bestSet.add(i);
    });
    return bestSet;
  }

  const selectStyle = {
    padding: "0.5rem 0.75rem",
    borderRadius: "0.4rem",
    background: "#0d0d18",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#e8e8ff",
    fontSize: "0.8rem",
    width: "100%",
    outline: "none",
    cursor: "pointer",
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1rem" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ color: "#e8e8ff", fontWeight: 800, fontSize: "1.8rem" }}>
            GPU Comparison
          </h1>
          <p style={{ color: "#606070", fontSize: "0.875rem" }}>
            Compare up to 3 GPUs side by side
          </p>
        </div>
        {selectedGpus.length > 0 && (
          <button
            type="button"
            data-ocid="compare.clear.button"
            onClick={clearCompare}
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "0.4rem",
              background: "transparent",
              border: "1px solid rgba(248,113,113,0.3)",
              color: "#f87171",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* GPU Selectors */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {(["slot1", "slot2", "slot3"] as const).map((slotKey, slotIdx) => {
          const gpu = selectedGpus[slotIdx];
          const ocids = [
            "compare.slot1.select",
            "compare.slot2.select",
            "compare.slot3.select",
          ];
          return (
            <div
              key={slotKey}
              style={{
                background: "#12121e",
                border: `1px solid ${gpu ? "rgba(0,255,136,0.2)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: "0.75rem",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  color: "#606070",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  letterSpacing: "0.05em",
                }}
              >
                SLOT {slotIdx + 1}
              </div>
              {loading ? (
                <div style={{ color: "#404050", fontSize: "0.8rem" }}>
                  Loading...
                </div>
              ) : (
                <select
                  data-ocid={ocids[slotIdx]}
                  value={gpu ? String(gpu.id) : ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) {
                      if (gpu) removeFromCompare(gpu.id);
                      return;
                    }
                    const found = allGpus.find((g) => String(g.id) === val);
                    if (found) {
                      if (gpu) removeFromCompare(gpu.id);
                      addToCompare(found.id);
                    }
                  }}
                  style={selectStyle}
                >
                  <option value="">-- Select GPU --</option>
                  {allGpus.map((g) => (
                    <option
                      key={String(g.id)}
                      value={String(g.id)}
                      disabled={compareIds.includes(g.id) && g.id !== gpu?.id}
                    >
                      {g.name} (₹{Number(g.price).toLocaleString("en-IN")})
                    </option>
                  ))}
                </select>
              )}
              {gpu && (
                <div style={{ marginTop: "0.75rem" }}>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#c8c8e8",
                      fontSize: "0.9rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {gpu.name}
                  </div>
                  <StarRating rating={gpu.performanceRating} />
                  <div
                    style={{
                      color: "#00ff88",
                      fontWeight: 800,
                      marginTop: "0.25rem",
                    }}
                  >
                    ₹{Number(gpu.price).toLocaleString("en-IN")}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Comparison table */}
      {selectedGpus.length >= 2 ? (
        <div
          style={{
            background: "#12121e",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "0.75rem",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  background: "rgba(0,255,136,0.05)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <th
                  style={{
                    padding: "1rem",
                    color: "#606070",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textAlign: "left",
                    width: "25%",
                  }}
                >
                  SPEC
                </th>
                {selectedGpus.map((g) => (
                  <th
                    key={String(g.id)}
                    style={{
                      padding: "1rem",
                      color: "#c8c8e8",
                      fontWeight: 700,
                      textAlign: "center",
                      fontSize: "0.85rem",
                    }}
                  >
                    {g.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map(([label, getter, prefer]) => {
                const bestIdxs = getBest(label, selectedGpus, prefer);
                return (
                  <tr
                    key={label}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <td
                      style={{
                        padding: "0.85rem 1rem",
                        color: "#606070",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                      }}
                    >
                      {label}
                    </td>
                    {selectedGpus.map((g, gi) => {
                      const val = getter(g);
                      const isBest = bestIdxs.has(gi);
                      return (
                        <td
                          key={String(g.id)}
                          style={{
                            padding: "0.85rem 1rem",
                            textAlign: "center",
                            fontSize: "0.875rem",
                            fontWeight: isBest ? 700 : 400,
                            color: isBest ? "#00ff88" : "#c8c8e8",
                            background: isBest
                              ? "rgba(0,255,136,0.05)"
                              : "transparent",
                          }}
                        >
                          {typeof val === "number" && label === "Price (₹)"
                            ? `₹${val.toLocaleString("en-IN")}`
                            : String(val)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          data-ocid="compare.empty_state"
          style={{
            textAlign: "center",
            padding: "4rem",
            color: "#404050",
            border: "2px dashed rgba(255,255,255,0.06)",
            borderRadius: "0.75rem",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>⚡</div>
          <div
            style={{
              fontWeight: 700,
              marginBottom: "0.5rem",
              color: "#606070",
            }}
          >
            Select at least 2 GPUs to compare
          </div>
          <div style={{ fontSize: "0.875rem" }}>
            Use the dropdowns above to choose GPUs
          </div>
        </div>
      )}
    </div>
  );
}
