import { useEffect, useState } from "react";
import { useCompare, useRouter } from "../App";
import type { GpuType } from "../backend.d";
import { backend } from "../backendClient";
import { StarRating } from "../components/GpuCard";
import { useContactActions } from "../hooks/useContactActions";

interface Props {
  gpuId: bigint;
}

export default function GpuDetailPage({ gpuId }: Props) {
  const { navigate } = useRouter();
  const { compareIds, addToCompare } = useCompare();
  const [gpu, setGpu] = useState<GpuType | null>(null);
  const [loading, setLoading] = useState(true);
  const { buyOnWhatsApp, copyUpiId, sendEmailInquiry } = useContactActions(
    gpu?.name,
  );

  useEffect(() => {
    backend.getGpu(gpuId).then((g) => {
      setGpu(g);
      setLoading(false);
    });
  }, [gpuId]);

  if (loading)
    return (
      <div
        data-ocid="gpu.loading_state"
        style={{ textAlign: "center", padding: "6rem", color: "#808090" }}
      >
        Loading...
      </div>
    );

  if (!gpu)
    return (
      <div
        data-ocid="gpu.error_state"
        style={{ textAlign: "center", padding: "6rem", color: "#808090" }}
      >
        GPU not found.
      </div>
    );

  const isNvidia = gpu.brand === "NVIDIA";
  const inCompare = compareIds.includes(gpu.id);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem 1rem" }}>
      <button
        type="button"
        onClick={() => navigate("browse")}
        style={{
          color: "#606070",
          background: "none",
          border: "none",
          cursor: "pointer",
          marginBottom: "1.5rem",
          fontSize: "0.9rem",
        }}
      >
        ← Back to Browse
      </button>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
      >
        {/* Left: image + actions */}
        <div>
          <div
            style={{
              background: "linear-gradient(135deg, #0d0d20, #1a1a35)",
              borderRadius: "1rem",
              height: "280px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "5rem",
              marginBottom: "1.5rem",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {gpu.imageUrl ? (
              <img
                src={gpu.imageUrl}
                alt={gpu.name}
                style={{ maxHeight: "100%", objectFit: "contain" }}
              />
            ) : (
              "🎮"
            )}
          </div>

          {/* Action buttons */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <button
              type="button"
              data-ocid="gpu.whatsapp.button"
              onClick={buyOnWhatsApp}
              style={{
                padding: "0.85rem",
                borderRadius: "0.5rem",
                background: "linear-gradient(135deg, #25d366, #128c7e)",
                color: "white",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              💬 Buy on WhatsApp
            </button>
            <button
              type="button"
              data-ocid="gpu.copy_upi.button"
              onClick={copyUpiId}
              style={{
                padding: "0.85rem",
                borderRadius: "0.5rem",
                background: "rgba(0,212,255,0.15)",
                color: "#00d4ff",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "1px solid rgba(0,212,255,0.4)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              📋 Copy UPI ID
            </button>
            <button
              type="button"
              data-ocid="gpu.email.button"
              onClick={sendEmailInquiry}
              style={{
                padding: "0.85rem",
                borderRadius: "0.5rem",
                background: "transparent",
                color: "#a0a0c0",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "1px solid rgba(255,255,255,0.15)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              ✉️ Send Email Inquiry
            </button>
            <button
              type="button"
              data-ocid="gpu.compare.button"
              onClick={() => {
                addToCompare(gpu.id);
                navigate("compare");
              }}
              disabled={inCompare}
              style={{
                padding: "0.65rem",
                borderRadius: "0.5rem",
                background: inCompare ? "rgba(0,255,136,0.1)" : "transparent",
                color: inCompare ? "#00ff88" : "#606070",
                fontWeight: 600,
                fontSize: "0.85rem",
                border: `1px solid ${inCompare ? "rgba(0,255,136,0.3)" : "rgba(255,255,255,0.08)"}`,
                cursor: inCompare ? "default" : "pointer",
              }}
            >
              {inCompare ? "✓ Added to Compare" : "+ Add to Compare"}
            </button>
          </div>
        </div>

        {/* Right: details */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              style={{
                padding: "0.2rem 0.6rem",
                borderRadius: "0.3rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                background: isNvidia
                  ? "rgba(118,185,0,0.2)"
                  : "rgba(237,28,36,0.2)",
                color: isNvidia ? "#76b900" : "#ed1c24",
              }}
            >
              {gpu.brand}
            </span>
            <span style={{ color: "#606070", fontSize: "0.85rem" }}>
              {gpu.series}
            </span>
          </div>

          <h1
            style={{
              color: "#e8e8ff",
              fontWeight: 900,
              fontSize: "2rem",
              marginBottom: "0.5rem",
              lineHeight: 1.1,
            }}
          >
            {gpu.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={gpu.performanceRating} />
            <span
              style={{
                padding: "0.2rem 0.6rem",
                borderRadius: "0.3rem",
                fontSize: "0.75rem",
                background:
                  gpu.condition === "Refurbished"
                    ? "rgba(139,92,246,0.2)"
                    : "rgba(255,255,255,0.08)",
                color: gpu.condition === "Refurbished" ? "#a78bfa" : "#909090",
              }}
            >
              {gpu.condition}
            </span>
          </div>

          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: 900,
              color: "#00ff88",
              marginBottom: "1.5rem",
            }}
          >
            ₹{Number(gpu.price).toLocaleString("en-IN")}
          </div>

          <p
            style={{
              color: "#8080a0",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
              fontSize: "0.95rem",
            }}
          >
            {gpu.description}
          </p>

          {/* Specs table */}
          <div
            style={{
              background: "#12121e",
              borderRadius: "0.75rem",
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            {[
              ["VRAM", gpu.vram],
              ["TDP", `${gpu.tdp}W`],
              ["Release Year", String(gpu.releaseYear)],
              ["Brand", gpu.brand],
              ["Series", gpu.series],
              ["Condition", gpu.condition],
              ["Performance", `${gpu.performanceRating}/5.0`],
            ].map(([label, value], i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.65rem 1rem",
                  background:
                    i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                  borderBottom:
                    i < 6 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <span style={{ color: "#606070", fontSize: "0.875rem" }}>
                  {label}
                </span>
                <span
                  style={{
                    color: "#c8c8e8",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
