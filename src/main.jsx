import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme-provider.jsx";
import "./index.css";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import WorkoutPlanPage from "./pages/WorkoutPlanPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import TrainerPage from "./pages/TrainerPage.jsx";
import MessagePage from "./pages/MessagePage.jsx";
import AxiosProvider from "./context/AxiosProvider.jsx";
import UserProvider from "./context/UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BrowserRouter>
        <AxiosProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/workoutplan" element={<WorkoutPlanPage />} />
              <Route path="/client_profile" element={<ProfilePage />} />
              <Route path="/trainer" element={<TrainerPage />} />
              <Route path="/message" element={<MessagePage />} />
            </Routes>
          </UserProvider>
        </AxiosProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
