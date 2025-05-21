import { WorkoutPlanForm } from "@/components/workout-plan-form";

export default function WorkoutPlanPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Crea Piano di Allenamento
          </h1>
          <p className="mt-2 text-muted-foreground">
            Crea un nuovo piano di allenamento personalizzato e associalo a un
            cliente.
          </p>
        </div>
        <div className="flex justify-center">
          <WorkoutPlanForm />
        </div>
      </div>
    </div>
  );
}
