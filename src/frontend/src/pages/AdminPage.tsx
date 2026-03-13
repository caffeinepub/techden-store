import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { GpuType } from "../backend.d";
import { backend } from "../backendClient";
import { StarRating } from "../components/GpuCard";

interface FormData {
  name: string;
  brand: string;
  series: string;
  vram: string;
  price: string;
  condition: string;
  performanceRating: string;
  description: string;
  releaseYear: string;
  tdp: string;
  imageUrl: string;
}

const emptyForm: FormData = {
  name: "",
  brand: "NVIDIA",
  series: "",
  vram: "",
  price: "",
  condition: "Used",
  performanceRating: "4.0",
  description: "",
  releaseYear: "2022",
  tdp: "",
  imageUrl: "",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("admin_authed") === "true",
  );
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [gpus, setGpus] = useState<GpuType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<bigint | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authed) loadGpus();
  }, [authed]);

  async function loadGpus() {
    setLoading(true);
    const g = await backend.getGpus();
    setGpus(g.sort((a, b) => a.name.localeCompare(b.name)));
    setLoading(false);
  }

  async function handleLogin() {
    const ok = await backend.verifyAdminPassword(password);
    if (ok) {
      sessionStorage.setItem("admin_authed", "true");
      setAuthed(true);
    } else {
      setAuthError("Incorrect password. Try again.");
    }
  }

  function openAdd() {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(gpu: GpuType) {
    setEditId(gpu.id);
    setForm({
      name: gpu.name,
      brand: gpu.brand,
      series: gpu.series,
      vram: gpu.vram,
      price: String(gpu.price),
      condition: gpu.condition,
      performanceRating: String(gpu.performanceRating),
      description: gpu.description,
      releaseYear: String(gpu.releaseYear),
      tdp: String(gpu.tdp),
      imageUrl: gpu.imageUrl,
    });
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editId !== null) {
        await backend.updateGpu(
          editId,
          form.name,
          form.brand,
          form.series,
          form.vram,
          BigInt(form.price),
          form.condition,
          Number.parseFloat(form.performanceRating),
          form.description,
          BigInt(form.releaseYear),
          BigInt(form.tdp),
          form.imageUrl,
        );
        toast.success("GPU updated!");
      } else {
        await backend.addGpu(
          form.name,
          form.brand,
          form.series,
          form.vram,
          BigInt(form.price),
          form.condition,
          Number.parseFloat(form.performanceRating),
          form.description,
          BigInt(form.releaseYear),
          BigInt(form.tdp),
          form.imageUrl,
        );
        toast.success("GPU added!");
      }
      setShowForm(false);
      await loadGpus();
    } catch {
      toast.error("Error saving GPU.");
    }
    setSaving(false);
  }

  async function handleDelete(id: bigint) {
    await backend.removeGpu(id);
    toast.success("GPU removed.");
    setDeleteConfirm(null);
    await loadGpus();
  }

  async function handleToggleFeatured(id: bigint) {
    await backend.toggleFeatured(id);
    await loadGpus();
  }

  const inputStyle = {
    padding: "0.6rem 0.85rem",
    borderRadius: "0.45rem",
    background: "#0d0d18",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#e8e8ff",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
  };

  if (!authed) {
    return (
      <div
        style={{ maxWidth: "400px", margin: "6rem auto", padding: "0 1rem" }}
      >
        <div
          style={{
            background: "#12121e",
            border: "1px solid rgba(0,255,136,0.15)",
            borderRadius: "1rem",
            padding: "2.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔐</div>
          <h2
            style={{
              color: "#e8e8ff",
              fontWeight: 800,
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            Admin Access
          </h2>
          <p
            style={{
              color: "#606070",
              fontSize: "0.875rem",
              marginBottom: "1.5rem",
            }}
          >
            Enter password to manage inventory
          </p>
          <input
            data-ocid="admin.password.input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Password"
            style={{
              ...inputStyle,
              marginBottom: "0.75rem",
              textAlign: "center",
            }}
          />
          {authError && (
            <div
              data-ocid="admin.error_state"
              style={{
                color: "#f87171",
                fontSize: "0.8rem",
                marginBottom: "0.75rem",
              }}
            >
              {authError}
            </div>
          )}
          <button
            type="button"
            data-ocid="admin.login.button"
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #00ff88, #00d4ff)",
              color: "#0a0a14",
              fontWeight: 800,
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ color: "#e8e8ff", fontWeight: 800, fontSize: "1.8rem" }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "#606070", fontSize: "0.875rem" }}>
            Manage GPU inventory
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div style={{ color: "#606070", fontSize: "0.85rem" }}>
            <span style={{ color: "#00ff88", fontWeight: 700 }}>
              {gpus.length}
            </span>{" "}
            GPUs |
            <span style={{ color: "#00ff88", fontWeight: 700 }}>
              {" "}
              {gpus.filter((g) => g.isFeatured).length}
            </span>{" "}
            Featured
          </div>
          <button
            type="button"
            data-ocid="admin.add_gpu.button"
            onClick={openAdd}
            style={{
              padding: "0.65rem 1.25rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #00ff88, #00d4ff)",
              color: "#0a0a14",
              fontWeight: 800,
              fontSize: "0.875rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            + Add GPU
          </button>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem("admin_authed");
              window.location.reload();
            }}
            style={{
              padding: "0.65rem 1rem",
              borderRadius: "0.5rem",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#606070",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#606070" }}>
          Loading...
        </div>
      ) : (
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
                {[
                  "GPU Name",
                  "Brand",
                  "Price",
                  "Condition",
                  "Rating",
                  "Featured",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "0.85rem 1rem",
                      color: "#606070",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      textAlign: "left",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gpus.map((gpu, i) => (
                <tr
                  key={String(gpu.id)}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "#c8c8e8",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    {gpu.name}
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span
                      style={{
                        padding: "0.15rem 0.45rem",
                        borderRadius: "0.25rem",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        background:
                          gpu.brand === "NVIDIA"
                            ? "rgba(118,185,0,0.2)"
                            : "rgba(237,28,36,0.2)",
                        color: gpu.brand === "NVIDIA" ? "#76b900" : "#ed1c24",
                      }}
                    >
                      {gpu.brand}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "#00ff88",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                    }}
                  >
                    ₹{Number(gpu.price).toLocaleString("en-IN")}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem 1rem",
                      color: "#8080a0",
                      fontSize: "0.8rem",
                    }}
                  >
                    {gpu.condition}
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <StarRating rating={gpu.performanceRating} />
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <button
                      type="button"
                      data-ocid={`admin.gpu.toggle.${i + 1}`}
                      onClick={() => handleToggleFeatured(gpu.id)}
                      style={{
                        fontSize: "1.1rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        opacity: gpu.isFeatured ? 1 : 0.3,
                      }}
                    >
                      ⭐
                    </button>
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        data-ocid={`admin.gpu.edit_button.${i + 1}`}
                        onClick={() => openEdit(gpu)}
                        style={{
                          padding: "0.35rem 0.75rem",
                          borderRadius: "0.35rem",
                          background: "rgba(0,212,255,0.1)",
                          border: "1px solid rgba(0,212,255,0.3)",
                          color: "#00d4ff",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        data-ocid={`admin.gpu.delete_button.${i + 1}`}
                        onClick={() => setDeleteConfirm(gpu.id)}
                        style={{
                          padding: "0.35rem 0.75rem",
                          borderRadius: "0.35rem",
                          background: "rgba(248,113,113,0.1)",
                          border: "1px solid rgba(248,113,113,0.3)",
                          color: "#f87171",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "#12121e",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "1rem",
              padding: "2rem",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h2
              style={{
                color: "#e8e8ff",
                fontWeight: 800,
                marginBottom: "1.5rem",
              }}
            >
              {editId !== null ? "Edit GPU" : "Add New GPU"}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              {[
                ["name", "GPU Name", "text"],
                ["vram", "VRAM (e.g. 8GB)", "text"],
                ["price", "Price (₹)", "number"],
                ["tdp", "TDP (Watts)", "number"],
                ["releaseYear", "Release Year", "number"],
                ["performanceRating", "Rating (0-5)", "number"],
                ["imageUrl", "Image URL (optional)", "text"],
                ["series", "Series", "text"],
              ].map(([key, label, type]) => (
                <div key={key}>
                  <div
                    style={{
                      display: "block",
                      color: "#606070",
                      fontSize: "0.75rem",
                      marginBottom: "0.25rem",
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </div>
                  <input
                    type={type}
                    value={form[key as keyof FormData]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    style={inputStyle}
                  />
                </div>
              ))}
              <div>
                <div
                  style={{
                    display: "block",
                    color: "#606070",
                    fontSize: "0.75rem",
                    marginBottom: "0.25rem",
                    fontWeight: 600,
                  }}
                >
                  Brand
                </div>
                <select
                  value={form.brand}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, brand: e.target.value }))
                  }
                  style={inputStyle}
                >
                  <option>NVIDIA</option>
                  <option>AMD</option>
                </select>
              </div>
              <div>
                <div
                  style={{
                    display: "block",
                    color: "#606070",
                    fontSize: "0.75rem",
                    marginBottom: "0.25rem",
                    fontWeight: 600,
                  }}
                >
                  Condition
                </div>
                <select
                  value={form.condition}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, condition: e.target.value }))
                  }
                  style={inputStyle}
                >
                  <option>Used</option>
                  <option>Refurbished</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: "0.75rem" }}>
              <div
                style={{
                  display: "block",
                  color: "#606070",
                  fontSize: "0.75rem",
                  marginBottom: "0.25rem",
                  fontWeight: 600,
                }}
              >
                Description
              </div>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            <div
              className="flex gap-3 mt-5"
              style={{ justifyContent: "flex-end" }}
            >
              <button
                type="button"
                data-ocid="admin.cancel.button"
                onClick={() => setShowForm(false)}
                style={{
                  padding: "0.65rem 1.25rem",
                  borderRadius: "0.5rem",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#606070",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                data-ocid="admin.save.button"
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: "0.65rem 1.5rem",
                  borderRadius: "0.5rem",
                  background: "linear-gradient(135deg, #00ff88, #00d4ff)",
                  color: "#0a0a14",
                  fontWeight: 800,
                  border: "none",
                  cursor: saving ? "not-allowed" : "pointer",
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? "Saving..." : "Save GPU"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: "#12121e",
              border: "1px solid rgba(248,113,113,0.3)",
              borderRadius: "1rem",
              padding: "2rem",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️</div>
            <h3
              style={{
                color: "#e8e8ff",
                fontWeight: 700,
                marginBottom: "0.5rem",
              }}
            >
              Delete GPU?
            </h3>
            <p
              style={{
                color: "#8080a0",
                fontSize: "0.875rem",
                marginBottom: "1.5rem",
              }}
            >
              This action cannot be undone.
            </p>
            <div className="flex gap-3" style={{ justifyContent: "center" }}>
              <button
                type="button"
                data-ocid="admin.cancel.button"
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: "0.65rem 1.25rem",
                  borderRadius: "0.5rem",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#606070",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                data-ocid="admin.confirm.button"
                onClick={() => handleDelete(deleteConfirm)}
                style={{
                  padding: "0.65rem 1.5rem",
                  borderRadius: "0.5rem",
                  background: "rgba(248,113,113,0.2)",
                  border: "1px solid rgba(248,113,113,0.4)",
                  color: "#f87171",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
