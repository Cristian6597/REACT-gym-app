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
import GuestLayout from "./layouts/GuestLayout.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { CreateWorkoutPlanForm } from "./components/create-workout-plan-form.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BrowserRouter>
        <AxiosProvider>
          <UserProvider>
            <Routes>
              {/* Rotte protette */}
              <Route element={<ProtectedLayout />}>
                <Route path="/" element={<App />} />
                <Route
                  path="/create-workoutplan"
                  element={<CreateWorkoutPlanForm />}
                />
                <Route
                  path="/workout-plans/:id/add-exercises"
                  element={<WorkoutPlanPage />}
                />

                <Route path="/register-trainer" element={<TrainerPage />} />
                <Route path="/workoutplan" element={<WorkoutPlanPage />} />
                <Route path="/client_profile" element={<ProfilePage />} />
                <Route path="/trainer" element={<TrainerPage />} />
                <Route path="/message" element={<MessagePage />} />
              </Route>

              {/* Rotte guest */}
              <Route element={<GuestLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
            </Routes>
          </UserProvider>
        </AxiosProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
