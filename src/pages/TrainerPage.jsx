import { TrainerSettingsForm } from "@/components/trainer-settings-forms";

export default function TrainerPage() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen px-4 py-10">
      <div className="w-full max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-center">Trainer Profile</h1>

        <TrainerSettingsForm />
      </div>
    </div>
  );
}
