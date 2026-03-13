import { Router as WouterRouter, Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AccessProvider } from "./contexts/AccessContext";
import Home from "./pages/Home";

function Routes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AccessProvider>
          <TooltipProvider>
            <Toaster />
            <WouterRouter base="/dashboard-bollinger">
              <Routes />
            </WouterRouter>
          </TooltipProvider>
        </AccessProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
