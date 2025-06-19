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
import TrainerMain from "./pages/TrainerMain.jsx";
import { ProtectedClientRoute } from "./layouts/ProtectedClientRoute.jsx";
import { ProtectedTrainerRoute } from "./layouts/ProtectedTrainerRoute.jsx";
import ClientProfile from "./components/profile-page-client.jsx";
import { ProfileSettingsForm } from "./components/profile-settings-forms.jsx";
import MyWorkouts from "./components/my-workouts.jsx";
import MyWorkoutsPage from "./pages/MyWorkoutsPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BrowserRouter>
        <AxiosProvider>
          <UserProvider>
            <Routes>
              <Route element={<ProtectedLayout />}>
                {/* Rotte condivise a entrambi */}
                <Route path="/message" element={<MessagePage />} />
                {/* altre rotte condivise come notifiche */}

                {/* Rotte solo client */}
                <Route element={<ProtectedClientRoute />}>
                  <Route path="/" element={<App />} />
                  <Route path="/client_profile" element={<ClientProfile />} />
                  <Route path="/my-workouts" element={<MyWorkoutsPage />} />
                  <Route
                    path="/edit_client_profile"
                    element={<ProfilePage />}
                  />
                  <Route path="/workoutplan" element={<WorkoutPlanPage />} />
                  <Route path="/register-trainer" element={<TrainerPage />} />
                  {/* altre rotte client */}
                </Route>

                {/* Rotte solo trainer */}
                <Route element={<ProtectedTrainerRoute />}>
                  <Route path="/trainer-main" element={<TrainerMain />} />
                  <Route
                    path="/create-workoutplan"
                    element={<CreateWorkoutPlanForm />}
                  />
                  <Route
                    path="/workout-plans/:id/add-exercises"
                    element={<WorkoutPlanPage />}
                  />
                  <Route path="/trainer" element={<TrainerPage />} />
                  {/* altre rotte trainer */}
                </Route>
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
