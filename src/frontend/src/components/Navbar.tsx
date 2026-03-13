import { useRouter } from "../App";

export default function Navbar() {
  const { navigate, state } = useRouter();

  const links = [
    { label: "Home", page: "home" as const, ocid: "nav.home.link" },
    { label: "Browse GPUs", page: "browse" as const, ocid: "nav.browse.link" },
    { label: "Compare", page: "compare" as const, ocid: "nav.compare.link" },
    { label: "About", page: "about" as const, ocid: "nav.about.link" },
    { label: "Contact", page: "contact" as const, ocid: "nav.contact.link" },
  ];

  return (
    <nav
      style={{
        background: "rgba(10,10,20,0.95)",
        borderBottom: "1px solid rgba(0,255,136,0.2)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div
            style={{
              background: "linear-gradient(135deg, #00ff88, #00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.5rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            ⚡ TechDen Store
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              type="button"
              key={link.page}
              data-ocid={link.ocid}
              onClick={() => navigate(link.page)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: state.page === link.page ? "#00ff88" : "#a0a0c0",
                background:
                  state.page === link.page
                    ? "rgba(0,255,136,0.1)"
                    : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (state.page !== link.page)
                  (e.target as HTMLButtonElement).style.color = "#e0e0ff";
              }}
              onMouseLeave={(e) => {
                if (state.page !== link.page)
                  (e.target as HTMLButtonElement).style.color = "#a0a0c0";
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          data-ocid="nav.admin.link"
          onClick={() => navigate("admin")}
          style={{
            padding: "0.4rem 0.9rem",
            borderRadius: "0.4rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: state.page === "admin" ? "#00ff88" : "#606080",
            background:
              state.page === "admin"
                ? "rgba(0,255,136,0.1)"
                : "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer",
          }}
        >
          Admin
        </button>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden px-4 pb-2 flex gap-2 overflow-x-auto">
        {links.map((link) => (
          <button
            type="button"
            key={link.page}
            onClick={() => navigate(link.page)}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "0.4rem",
              fontSize: "0.8rem",
              whiteSpace: "nowrap",
              color: state.page === link.page ? "#00ff88" : "#a0a0c0",
              background:
                state.page === link.page
                  ? "rgba(0,255,136,0.1)"
                  : "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
