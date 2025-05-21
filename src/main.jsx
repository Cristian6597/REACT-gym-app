import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SidebarProvider } from "./components/ui/sidebar.jsx";
import { ThemeProvider } from "./components/theme-provider.jsx";

// 👉 Importa BrowserRouter
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import { LoginForm } from "./components/login-form.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SidebarProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* 👉 Avvolgi tutto con BrowserRouter */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </SidebarProvider>
  </React.StrictMode>
);
