import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ChatWithTrina from "./pages/ChatWithTrina";
import Activities from "./pages/Activities";
import Resources from "./pages/Resources";
import HealthProfile from "./pages/HealthProfile";
import Crisis from "./pages/Crisis";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/chat"} component={ChatWithTrina} />
      <Route path={"/activities"} component={Activities} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/profile"} component={HealthProfile} />
      <Route path={"/crisis"} component={Crisis} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

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
