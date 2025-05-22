import { ProfileSettingsForm } from "@/components/profile-settings-forms";
import { ToastProvider } from "@radix-ui/react-toast";

export default function ProfilePage() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen px-4 py-10">
      <div className="w-full max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-center">
          Profile Settings
        </h1>

        <ProfileSettingsForm />
      </div>
    </div>
  );
}
