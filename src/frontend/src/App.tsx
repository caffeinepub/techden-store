import { createContext, useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import BrowsePage from "./pages/BrowsePage";
import ComparePage from "./pages/ComparePage";
import ContactPage from "./pages/ContactPage";
import GpuDetailPage from "./pages/GpuDetailPage";
import HomePage from "./pages/HomePage";

type Page =
  | "home"
  | "browse"
  | "gpu"
  | "about"
  | "contact"
  | "admin"
  | "compare";

interface RouterState {
  page: Page;
  gpuId?: bigint;
}

interface RouterContextType {
  navigate: (page: Page, gpuId?: bigint) => void;
  state: RouterState;
}

export const RouterContext = createContext<RouterContextType>({
  navigate: () => {},
  state: { page: "home" },
});

export function useRouter() {
  return useContext(RouterContext);
}

export interface CompareContextType {
  compareIds: bigint[];
  addToCompare: (id: bigint) => void;
  removeFromCompare: (id: bigint) => void;
  clearCompare: () => void;
}

export const CompareContext = createContext<CompareContextType>({
  compareIds: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  clearCompare: () => {},
});

export function useCompare() {
  return useContext(CompareContext);
}

export default function App() {
  const [routerState, setRouterState] = useState<RouterState>({ page: "home" });
  const [compareIds, setCompareIds] = useState<bigint[]>([]);

  const navigate = (page: Page, gpuId?: bigint) => {
    setRouterState({ page, gpuId });
    window.scrollTo(0, 0);
  };

  const addToCompare = (id: bigint) => {
    setCompareIds((prev) => {
      if (prev.includes(id) || prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const removeFromCompare = (id: bigint) => {
    setCompareIds((prev) => prev.filter((x) => x !== id));
  };

  const clearCompare = () => setCompareIds([]);

  const renderPage = () => {
    switch (routerState.page) {
      case "home":
        return <HomePage />;
      case "browse":
        return <BrowsePage />;
      case "gpu":
        return <GpuDetailPage gpuId={routerState.gpuId!} />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "admin":
        return <AdminPage />;
      case "compare":
        return <ComparePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <RouterContext.Provider value={{ navigate, state: routerState }}>
      <CompareContext.Provider
        value={{ compareIds, addToCompare, removeFromCompare, clearCompare }}
      >
        <div className="min-h-screen" style={{ background: "#0a0a14" }}>
          <Navbar />
          <main>{renderPage()}</main>
          <Toaster />
        </div>
      </CompareContext.Provider>
    </RouterContext.Provider>
  );
}
