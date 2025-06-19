import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

export function ExerciseGuideCard() {
  return (
    <Card className="dark:bg-[#18171B] custom-shadow transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5" />
          Exercise Guide
        </CardTitle>
        <CardDescription>
          Essential tips for proper form and technique
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="p-3 transition-all duration-300 border rounded-lg cursor-pointer hover:shadow-md custom-shadow">
              <h4 className="mb-2 text-sm font-semibold">
                🏋️ Compound Exercises
              </h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  • <strong>Squat:</strong> Keep chest up, knees track over toes
                </li>
                <li>
                  • <strong>Deadlift:</strong> Neutral spine, drive through
                  heels
                </li>
                <li>
                  • <strong>Bench Press:</strong> Retract shoulder blades,
                  controlled descent
                </li>
                <li>
                  • <strong>Pull-ups:</strong> Full range of motion, engage lats
                </li>
              </ul>
            </div>
            <div className="p-3 transition-all duration-300 border rounded-lg cursor-pointer hover:shadow-md custom-shadow">
              <h4 className="mb-2 text-sm font-semibold">⚡ Training Tips</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Warm up 5-10 minutes before lifting</li>
                <li>• Rest 2-3 minutes between heavy sets</li>
                <li>• Focus on progressive overload</li>
                <li>• Maintain proper breathing technique</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 transition-all duration-300 border rounded-lg cursor-pointer hover:shadow-md custom-shadow">
              <h4 className="mb-2 text-sm font-semibold">🎯 Rep Ranges</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  • <strong>Strength:</strong> 1-5 reps at 85-100% 1RM
                </li>
                <li>
                  • <strong>Hypertrophy:</strong> 6-12 reps at 70-85% 1RM
                </li>
                <li>
                  • <strong>Endurance:</strong> 12+ reps at 50-70% 1RM
                </li>
                <li>
                  • <strong>Power:</strong> 3-6 reps explosive movement
                </li>
              </ul>
            </div>
            <div className="p-3 transition-all duration-300 border rounded-lg cursor-pointer hover:shadow-md custom-shadow">
              <h4 className="mb-2 text-sm font-semibold">🔄 Recovery</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• Allow 48-72h rest between muscle groups</li>
                <li>• Get 7-9 hours of quality sleep</li>
                <li>• Stay hydrated (2-3L water daily)</li>
                <li>• Listen to your body's signals</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
