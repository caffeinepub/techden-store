import { useRouter } from "../App";

export default function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div
          style={{
            fontSize: "0.8rem",
            color: "#00ff88",
            fontWeight: 700,
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          ABOUT US
        </div>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            background: "linear-gradient(135deg, #ffffff, #00d4ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
          }}
        >
          TechDen Store
        </h1>
        <p
          style={{
            color: "#8080a0",
            fontSize: "1.1rem",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          Your trusted marketplace for quality used and refurbished GPUs
        </p>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, #12121e, #1a1a2e)",
          border: "1px solid rgba(0,255,136,0.1)",
          borderRadius: "1rem",
          padding: "2rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ color: "#00ff88", fontWeight: 700, marginBottom: "1rem" }}>
          Our Story
        </h2>
        <p style={{ color: "#8080a0", lineHeight: 1.8 }}>
          TechDen Store was founded by a passionate gamer and tech enthusiast
          who believed that high-performance gaming shouldn't require breaking
          the bank. We source, test, and carefully curate used GPUs so you can
          build powerful rigs at a fraction of the cost of new hardware.
        </p>
        <p style={{ color: "#8080a0", lineHeight: 1.8, marginTop: "1rem" }}>
          Every GPU in our catalog is personally inspected, stress-tested, and
          verified before listing. We stand behind every card we sell.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {[
          {
            icon: "🔍",
            title: "Tested & Verified",
            desc: "Every GPU is stress-tested and inspected before listing",
          },
          {
            icon: "💰",
            title: "Best Prices",
            desc: "Fair market prices on used and refurbished hardware",
          },
          {
            icon: "⚡",
            title: "Wide Selection",
            desc: "From budget GTX cards to flagship RTX and RX GPUs",
          },
          {
            icon: "🤝",
            title: "Direct Contact",
            desc: "Buy directly from the seller with no middlemen",
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              background: "#12121e",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "0.75rem",
              padding: "1.25rem",
            }}
          >
            <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
              {item.icon}
            </div>
            <h3
              style={{
                color: "#c8c8e8",
                fontWeight: 700,
                marginBottom: "0.5rem",
                fontSize: "0.95rem",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{ color: "#606070", fontSize: "0.85rem", lineHeight: 1.6 }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "#12121e",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "0.75rem",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ color: "#00d4ff", fontWeight: 700, marginBottom: "1rem" }}>
          Contact the Seller
        </h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <span style={{ color: "#8080a0" }}>
            📱 WhatsApp:{" "}
            <span style={{ color: "#c8c8e8" }}>+91 8638316552</span>
          </span>
          <span style={{ color: "#8080a0" }}>
            💳 UPI: <span style={{ color: "#c8c8e8" }}>piush.6552@waaxis</span>
          </span>
          <span style={{ color: "#8080a0" }}>
            ✉️ Email:{" "}
            <span style={{ color: "#c8c8e8" }}>vanquetty.exe@gmail.com</span>
          </span>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          type="button"
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
          Browse Our GPUs
        </button>
      </div>
    </div>
  );
}
