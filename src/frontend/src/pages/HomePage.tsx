import { useEffect, useState } from "react";
import { useRouter } from "../App";
import type { GpuType } from "../backend.d";
import { backend } from "../backendClient";
import GpuCard from "../components/GpuCard";
import { SEED_GPUS } from "../data/seedGpus";

export default function HomePage() {
  const { navigate } = useRouter();
  const [allGpus, setAllGpus] = useState<GpuType[]>([]);
  const [featured, setFeatured] = useState<GpuType[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const gpus = await backend.getGpus();
      if (gpus.length < 5) {
        setSeeding(true);
        for (const g of SEED_GPUS) {
          await backend.addGpu(
            g.name,
            g.brand,
            g.series,
            g.vram,
            BigInt(g.price),
            g.condition,
            g.performanceRating,
            g.description,
            BigInt(g.releaseYear),
            BigInt(g.tdp),
            g.imageUrl,
          );
        }
        const seeded = await backend.getGpus();
        const featuredSeeded = seeded.filter((g) =>
          SEED_GPUS.find((s) => s.name === g.name && s.isFeatured),
        );
        for (const fg of featuredSeeded) {
          await backend.toggleFeatured(fg.id);
        }
        setSeeding(false);
        const updated = await backend.getGpus();
        setAllGpus(updated);
        setFeatured(updated.filter((g) => g.isFeatured));
      } else {
        setAllGpus(gpus);
        setFeatured(gpus.filter((g) => g.isFeatured));
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  const filtered = allGpus.filter((g) => {
    const matchSearch =
      !search || g.name.toLowerCase().includes(search.toLowerCase());
    const matchBrand = !brandFilter || g.brand === brandFilter;
    const matchPrice = !maxPrice || Number(g.price) <= Number(maxPrice);
    return matchSearch && matchBrand && matchPrice;
  });

  const showResults = search || brandFilter || maxPrice;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "4rem 1rem",
          background:
            "linear-gradient(135deg, rgba(0,255,136,0.05), rgba(0,212,255,0.05))",
          borderRadius: "1rem",
          border: "1px solid rgba(0,255,136,0.1)",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            fontSize: "0.8rem",
            color: "#00ff88",
            fontWeight: 700,
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          🎮 TRUSTED USED GPU MARKETPLACE
        </div>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #ffffff, #00ff88)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
            lineHeight: 1.1,
          }}
        >
          Find Your Perfect GPU
        </h1>
        <p
          style={{
            color: "#8080a0",
            fontSize: "1.1rem",
            maxWidth: "500px",
            margin: "0 auto 2rem",
          }}
        >
          Quality used and refurbished GPUs at unbeatable prices. Every card
          tested and verified.
        </p>
        <button
          type="button"
          data-ocid="home.browse_cta.button"
          onClick={() => navigate("browse")}
          style={{
            padding: "0.85rem 2.5rem",
            borderRadius: "0.5rem",
            background: "linear-gradient(135deg, #00ff88, #00d4ff)",
            color: "#0a0a14",
            fontWeight: 800,
            fontSize: "1rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Browse All GPUs
        </button>
      </div>

      {/* Search & Filter */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <input
          data-ocid="home.search.input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search GPUs..."
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            background: "#12121e",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#e8e8ff",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
        <select
          data-ocid="home.brand.select"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            background: "#12121e",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#e8e8ff",
            fontSize: "0.95rem",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="">All Brands</option>
          <option value="NVIDIA">NVIDIA</option>
          <option value="AMD">AMD</option>
        </select>
        <input
          placeholder="Max price (₹)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          type="number"
          style={{
            width: "160px",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            background: "#12121e",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#e8e8ff",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
      </div>

      {loading ? (
        <div
          data-ocid="home.loading_state"
          style={{ textAlign: "center", padding: "4rem", color: "#808090" }}
        >
          {seeding ? "Setting up store with GPU catalog..." : "Loading GPUs..."}
        </div>
      ) : showResults ? (
        <>
          <h2
            style={{
              color: "#e8e8ff",
              fontWeight: 700,
              fontSize: "1.3rem",
              marginBottom: "1.25rem",
            }}
          >
            Results ({filtered.length})
          </h2>
          {filtered.length === 0 ? (
            <div
              data-ocid="home.empty_state"
              style={{ textAlign: "center", padding: "3rem", color: "#606070" }}
            >
              No GPUs match your search.
            </div>
          ) : (
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
          )}
        </>
      ) : (
        <>
          {/* Featured */}
          {featured.length > 0 && (
            <section style={{ marginBottom: "3rem" }}>
              <h2
                style={{
                  color: "#e8e8ff",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  marginBottom: "1.25rem",
                }}
              >
                ⭐ Featured GPUs
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {featured.map((gpu, i) => (
                  <GpuCard key={String(gpu.id)} gpu={gpu} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* All GPUs teaser */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2
                style={{
                  color: "#e8e8ff",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                }}
              >
                All GPUs ({allGpus.length})
              </h2>
              <button
                type="button"
                onClick={() => navigate("browse")}
                style={{
                  color: "#00ff88",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                View All →
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {allGpus.slice(0, 8).map((gpu, i) => (
                <GpuCard key={String(gpu.id)} gpu={gpu} index={i} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
