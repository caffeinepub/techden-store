import { useEffect, useState } from "react";
import type { GpuType } from "../backend.d";
import { backend } from "../backendClient";
import GpuCard from "../components/GpuCard";

const SERIES_OPTIONS = [
  "RTX 40",
  "RTX 30",
  "GTX 16",
  "GTX 10",
  "RX 7000",
  "RX 6000",
  "RX 5000",
  "RX 500",
];

export default function BrowsePage() {
  const [gpus, setGpus] = useState<GpuType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [series, setSeries] = useState("");
  const [condition, setCondition] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("name");

  useEffect(() => {
    backend.getGpus().then((g) => {
      setGpus(g);
      setLoading(false);
    });
  }, []);

  const filtered = gpus
    .filter((g) => {
      const s = search.toLowerCase();
      return (
        (!search ||
          g.name.toLowerCase().includes(s) ||
          g.series.toLowerCase().includes(s)) &&
        (!brand || g.brand === brand) &&
        (!series || g.series === series) &&
        (!condition || g.condition === condition) &&
        (!minPrice || Number(g.price) >= Number(minPrice)) &&
        (!maxPrice || Number(g.price) <= Number(maxPrice))
      );
    })
    .sort((a, b) => {
      if (sort === "price_asc") return Number(a.price) - Number(b.price);
      if (sort === "price_desc") return Number(b.price) - Number(a.price);
      if (sort === "rating") return b.performanceRating - a.performanceRating;
      return a.name.localeCompare(b.name);
    });

  const inputStyle = {
    padding: "0.6rem 0.85rem",
    borderRadius: "0.45rem",
    background: "#12121e",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e8e8ff",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
  };

  return (
    <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "2rem 1rem" }}>
      <h1
        style={{
          color: "#e8e8ff",
          fontWeight: 800,
          fontSize: "1.8rem",
          marginBottom: "0.5rem",
        }}
      >
        Browse GPUs
      </h1>
      <p style={{ color: "#606070", marginBottom: "1.5rem" }}>
        Find the perfect GPU for your build
      </p>

      {/* Filters */}
      <div
        style={{
          background: "#12121e",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "0.75rem",
          padding: "1.25rem",
          marginBottom: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "0.75rem",
        }}
      >
        <input
          data-ocid="browse.search.input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search GPU name..."
          style={inputStyle}
        />
        <select
          data-ocid="browse.brand.select"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          style={inputStyle}
        >
          <option value="">All Brands</option>
          <option value="NVIDIA">NVIDIA</option>
          <option value="AMD">AMD</option>
        </select>
        <select
          value={series}
          onChange={(e) => setSeries(e.target.value)}
          style={inputStyle}
        >
          <option value="">All Series</option>
          {SERIES_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          style={inputStyle}
        >
          <option value="">Any Condition</option>
          <option value="Used">Used</option>
          <option value="Refurbished">Refurbished</option>
        </select>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min ₹"
          style={inputStyle}
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max ₹"
          style={inputStyle}
        />
        <select
          data-ocid="browse.sort.select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={inputStyle}
        >
          <option value="name">Sort: Name</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Sort: Rating</option>
        </select>
      </div>

      {loading ? (
        <div
          data-ocid="browse.loading_state"
          style={{ textAlign: "center", padding: "4rem", color: "#808090" }}
        >
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div
          data-ocid="browse.empty_state"
          style={{ textAlign: "center", padding: "4rem", color: "#606070" }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</div>
          No GPUs match your filters.
        </div>
      ) : (
        <>
          <p
            style={{
              color: "#606070",
              fontSize: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            {filtered.length} GPUs found
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filtered.map((gpu, i) => (
              <GpuCard key={String(gpu.id)} gpu={gpu} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
