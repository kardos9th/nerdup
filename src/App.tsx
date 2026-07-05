import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GradePage from "./pages/GradePage";
import StreamSelectionPage from "./pages/StreamSelectionPage";
import SubjectPage from "./pages/SubjectPage";
import TeacherPage from "./pages/TeacherPage";
import CoursePage from "./pages/CoursePage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import StatsPage from "./pages/StatsPage";
import NotFound from "./pages/NotFound";
import { SiteContentProvider } from "./contexts/SiteContentContext";
import { useAnalyticsTracker } from "./hooks/use-analytics";

const queryClient = new QueryClient();

const RouteTracker = () => {
  useAnalyticsTracker();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SiteContentProvider>
        <BrowserRouter>
          <RouteTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/grade/:gradeId" element={<GradePage />} />
            <Route path="/grade/:gradeId/streams" element={<StreamSelectionPage />} />
            <Route path="/grade/:gradeId/stream/:streamId" element={<GradePage />} />
            <Route path="/subject/:subjectName" element={<SubjectPage />} />
            <Route path="/teacher/:teacherId" element={<TeacherPage />} />
            <Route path="/course/:courseId" element={<CoursePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/register" element={<AuthPage mode="register" />} />
            <Route path="/stats" element={<StatsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SiteContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
