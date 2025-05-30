
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CampsPage from "./pages/CampsPage";
import UrgentNeedPage from "./pages/UrgentNeedPage";
import RegisterDonorPage from "./pages/RegisterDonorPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import { ClerkProvider } from "./providers/ClerkProvider";
import DonationFormPage from "./pages/DonationFormPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ClerkProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/camps" element={<CampsPage />} />
            <Route path="/urgent" element={<UrgentNeedPage />} />
            <Route path="/register-donor" element={<RegisterDonorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/donate/:campId" element={<DonationFormPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ClerkProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
