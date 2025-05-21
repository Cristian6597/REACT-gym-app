import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { SidebarProvider } from "./components/ui/sidebar.jsx";
import "./index.css";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import WorkoutPlanPage from "./pages/WorkoutPlanPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SidebarProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/workoutplan" element={<WorkoutPlanPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </SidebarProvider>
  </React.StrictMode>
);
