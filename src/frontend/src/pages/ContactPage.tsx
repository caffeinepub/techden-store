import { useContactActions } from "../hooks/useContactActions";

export default function ContactPage() {
  const { buyOnWhatsApp, copyUpiId, sendEmailInquiry } = useContactActions();

  const btnStyle = (color: string) => ({
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    fontWeight: 700,
    fontSize: "0.9rem",
    cursor: "pointer",
    border: `1px solid ${color}40`,
    background: `${color}18`,
    color,
    transition: "all 0.2s",
  });

  const faqs = [
    {
      q: "Are the GPUs tested before selling?",
      a: "Yes, every GPU is personally stress-tested and inspected. Only cards that pass all tests are listed.",
    },
    {
      q: "What does 'Refurbished' mean?",
      a: "Refurbished GPUs have been professionally cleaned, thermal paste replaced, and thoroughly tested. They perform like new.",
    },
    {
      q: "How do I pay?",
      a: "You can pay via UPI (piush.6552@waaxis) or any payment method agreed upon over WhatsApp chat.",
    },
    {
      q: "Do you offer a warranty?",
      a: "Used GPUs come with a 30-day DOA guarantee. Any card that stops working within 30 days will be replaced or refunded.",
    },
    {
      q: "Can I negotiate the price?",
      a: "Feel free to reach out on WhatsApp — some flexibility may be available on bulk purchases or older models.",
    },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            background: "linear-gradient(135deg, #ffffff, #00ff88)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.75rem",
          }}
        >
          Get in Touch
        </h1>
        <p style={{ color: "#8080a0" }}>
          Reach out via your preferred channel to buy or ask questions
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        {/* WhatsApp */}
        <div
          style={{
            background: "linear-gradient(135deg, #12121e, #1a1a2e)",
            border: "1px solid rgba(37,211,102,0.2)",
            borderRadius: "1rem",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>💬</div>
          <h3
            style={{
              color: "#25d366",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            WhatsApp
          </h3>
          <p
            style={{
              color: "#8080a0",
              fontSize: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            +91 8638316552
          </p>
          <button
            type="button"
            data-ocid="contact.whatsapp.button"
            onClick={buyOnWhatsApp}
            style={btnStyle("#25d366")}
          >
            Chat on WhatsApp
          </button>
        </div>

        {/* UPI */}
        <div
          style={{
            background: "linear-gradient(135deg, #12121e, #1a1a2e)",
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: "1rem",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>💳</div>
          <h3
            style={{
              color: "#00d4ff",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            UPI Payment
          </h3>
          <p
            style={{
              color: "#8080a0",
              fontSize: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            piush.6552@waaxis
          </p>
          <button
            type="button"
            data-ocid="contact.copy_upi.button"
            onClick={copyUpiId}
            style={btnStyle("#00d4ff")}
          >
            Copy UPI ID
          </button>
        </div>

        {/* Email */}
        <div
          style={{
            background: "linear-gradient(135deg, #12121e, #1a1a2e)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "1rem",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>✉️</div>
          <h3
            style={{
              color: "#a0a0c0",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Email
          </h3>
          <p
            style={{
              color: "#8080a0",
              fontSize: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            vanquetty.exe@gmail.com
          </p>
          <button
            type="button"
            data-ocid="contact.email.button"
            onClick={sendEmailInquiry}
            style={btnStyle("#a0a0c0")}
          >
            Send Email
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2
          style={{
            color: "#e8e8ff",
            fontWeight: 700,
            fontSize: "1.3rem",
            marginBottom: "1.25rem",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {faqs.map((faq) => (
            <div
              key={faq.q}
              style={{
                background: "#12121e",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "0.75rem",
                padding: "1.25rem",
              }}
            >
              <h4
                style={{
                  color: "#c8c8e8",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  fontSize: "0.95rem",
                }}
              >
                Q: {faq.q}
              </h4>
              <p
                style={{
                  color: "#7070a0",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                A: {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
