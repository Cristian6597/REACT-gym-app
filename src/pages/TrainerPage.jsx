import TrainerRegistrationForm from "@/components/TrainerRegistrationForm";

export default function TrainerPage() {
  return (
    <div className="min-h-screen ">
      <div className="flex items-center justify-center w-full min-h-screen px-4 py-10">
        <div className="w-full max-w-3xl">
          <TrainerRegistrationForm />
        </div>
      </div>
    </div>
  );
}
