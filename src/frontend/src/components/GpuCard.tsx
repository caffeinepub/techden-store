import { useRouter } from "../App";
import type { GpuType } from "../backend.d";

interface GpuCardProps {
  gpu: GpuType;
  index?: number;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            color:
              i <= full
                ? "#f59e0b"
                : i === full + 1 && half
                  ? "#f59e0b"
                  : "#333355",
            fontSize: "0.85rem",
          }}
        >
          {i <= full ? "★" : i === full + 1 && half ? "☆" : "☆"}
        </span>
      ))}
      <span
        style={{ color: "#808090", fontSize: "0.75rem", marginLeft: "0.2rem" }}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export { StarRating };

export default function GpuCard({ gpu, index = 0 }: GpuCardProps) {
  const { navigate } = useRouter();
  const isNvidia = gpu.brand === "NVIDIA";

  return (
    <button
      type="button"
      data-ocid={`browse.gpu.card.${index + 1}`}
      className="card-hover"
      onClick={() => navigate("gpu", gpu.id)}
      style={{
        background: "linear-gradient(135deg, #12121e, #1a1a2e)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        textAlign: "left",
        width: "100%",
        display: "block",
      }}
    >
      {/* Brand accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: isNvidia
            ? "linear-gradient(90deg, #00ff88, #76b900)"
            : "linear-gradient(90deg, #00d4ff, #ed1c24)",
        }}
      />

      {/* Featured badge */}
      {gpu.isFeatured && (
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            background: "rgba(0,255,136,0.15)",
            border: "1px solid rgba(0,255,136,0.4)",
            borderRadius: "0.3rem",
            padding: "0.1rem 0.4rem",
            fontSize: "0.65rem",
            color: "#00ff88",
            fontWeight: 700,
            letterSpacing: "0.05em",
          }}
        >
          FEATURED
        </div>
      )}

      {/* GPU placeholder image */}
      <div
        style={{
          height: "120px",
          background: "linear-gradient(135deg, #0d0d20, #1a1a35)",
          borderRadius: "0.5rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
        }}
      >
        {gpu.imageUrl ? (
          <img
            src={gpu.imageUrl}
            alt={gpu.name}
            style={{ maxHeight: "100%", objectFit: "contain" }}
          />
        ) : (
          <span>🎮</span>
        )}
      </div>

      {/* Brand badge */}
      <div className="flex items-center gap-2 mb-2">
        <span
          style={{
            padding: "0.15rem 0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            background: isNvidia
              ? "rgba(118,185,0,0.2)"
              : "rgba(237,28,36,0.2)",
            color: isNvidia ? "#76b900" : "#ed1c24",
            border: `1px solid ${isNvidia ? "rgba(118,185,0,0.4)" : "rgba(237,28,36,0.4)"}`,
          }}
        >
          {gpu.brand}
        </span>
        <span
          style={{
            padding: "0.15rem 0.5rem",
            borderRadius: "0.25rem",
            fontSize: "0.65rem",
            fontWeight: 600,
            background: "rgba(0,212,255,0.1)",
            color: "#00d4ff",
            border: "1px solid rgba(0,212,255,0.3)",
          }}
        >
          {gpu.vram}
        </span>
      </div>

      <h3
        style={{
          color: "#e8e8ff",
          fontWeight: 700,
          fontSize: "1rem",
          marginBottom: "0.4rem",
        }}
      >
        {gpu.name}
      </h3>

      <StarRating rating={gpu.performanceRating} />

      <div className="flex items-center justify-between mt-3">
        <div>
          <span
            style={{ color: "#00ff88", fontWeight: 800, fontSize: "1.2rem" }}
          >
            ₹{Number(gpu.price).toLocaleString("en-IN")}
          </span>
        </div>
        <span
          style={{
            padding: "0.2rem 0.5rem",
            borderRadius: "0.3rem",
            fontSize: "0.7rem",
            fontWeight: 600,
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
          width: "100%",
          marginTop: "0.75rem",
          padding: "0.5rem",
          borderRadius: "0.4rem",
          background: "rgba(0,255,136,0.1)",
          border: "1px solid rgba(0,255,136,0.3)",
          color: "#00ff88",
          fontWeight: 600,
          fontSize: "0.85rem",
          textAlign: "center",
        }}
      >
        View Details →
      </div>
    </button>
  );
}
