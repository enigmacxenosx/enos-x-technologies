import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ChapterRail from "./components/ChapterRail";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Playhead from "./components/Playhead";
import { chapters } from "./data/site";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Core from "./pages/Core";
import Team from "./pages/Team";
import Accounts from "./pages/Accounts";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

/** A new page always opens on frame one, including when only the hash changes. */
function CutToFirstFrame({ path }: { path: string }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path]);
  return null;
}

function Router() {
  const [location] = useLocation();
  const home = location === "/";

  return (
    <>
      <CutToFirstFrame path={location} />
      <Playhead />
      <Header />
      {home ? <ChapterRail chapters={chapters} /> : null}
      <main id="main">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} />
          <Route path="/core" component={Core} />
          <Route path="/team" component={Team} />
          <Route path="/accounts" component={Accounts} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={Admin} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

// The palette is fixed light: newsprint grounds with ink-navy type. A dark
// toggle would undo the contrast decisions the video reels are graded against.
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
