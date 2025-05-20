
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import InfoPage from "./pages/InfoPage";
import FaqPage from "./pages/FaqPage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProfilePage from "./pages/dashboard/ProfilePage";
import CalendarPage from "./pages/dashboard/CalendarPage";
import { default as DashboardInfoPage } from "./pages/dashboard/InfoPage";
import CommunityPage from "./pages/dashboard/CommunityPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import NotFound from "./pages/NotFound";

// Criar o cliente de consultas fora do componente para evitar recriações
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route path="/dashboard/calendar" element={<CalendarPage />} />
            <Route path="/dashboard/info" element={<DashboardInfoPage />} />
            <Route path="/dashboard/community" element={<CommunityPage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
