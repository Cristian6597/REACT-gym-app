import TrainerRegistrationForm from "@/components/TrainerRegistrationForm";

export default function TrainerPage() {
  return (
    <div className="min-h-screen ">
      <div className="flex items-center justify-center w-full min-h-screen px-4 py-10">
        <div className="w-full max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              Trainer Profile
            </h1>
            <p className="text-lg text-gray-600">
              Gestisci il tuo profilo professionale
            </p>
          </div>
          <TrainerRegistrationForm />
        </div>
      </div>
    </div>
  );
}
