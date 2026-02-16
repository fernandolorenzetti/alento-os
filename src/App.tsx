import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import VTO from "@/pages/VTO";
import Rocks from "@/pages/Rocks";
import Scorecard from "@/pages/Scorecard";
import Issues from "@/pages/Issues";
import L10Meeting from "@/pages/L10Meeting";
import PeopleAnalyzer from "@/pages/PeopleAnalyzer";
import AccountabilityChart from "@/pages/AccountabilityChart";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/vto" element={<VTO />} />
                <Route path="/rocks" element={<Rocks />} />
                <Route path="/scorecard" element={<Scorecard />} />
                <Route path="/issues" element={<Issues />} />
                <Route path="/l10" element={<L10Meeting />} />
                <Route path="/people" element={<PeopleAnalyzer />} />
                <Route path="/accountability" element={<AccountabilityChart />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
