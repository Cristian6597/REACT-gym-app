import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

export function SupplementsGuideCard() {
  return (
    <Card className="dark:bg-[#18171B] hover:shadow-lg custom-shadow transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Supplements Guide
        </CardTitle>
        <CardDescription>
          Essential supplements to support your fitness goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="p-3 transition-all duration-300 border rounded-lg cursor-pointer hover:shadow-md custom-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Essential</Badge>
                <h4 className="text-sm font-semibold">💪 Protein Powder</h4>
              </div>
              <p className="mb-2 text-xs text-muted-foreground">
                Supports muscle recovery and growth
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  • <strong>Timing:</strong> Post-workout within 30 minutes
                </li>
                <li>
                  • <strong>Dosage:</strong> 20-30g per serving
                </li>
                <li>
                  • <strong>Types:</strong> Whey, Casein, Plant-based
                </li>
              </ul>
            </div>
            <div className="p-3 transition-all duration-300 border rounded-lg cursor-pointer hover:shadow-md custom-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Performance</Badge>
                <h4 className="text-sm font-semibold">⚡ Creatine</h4>
              </div>
              <p className="mb-2 text-xs text-muted-foreground">
                Increases strength and power output
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  • <strong>Timing:</strong> Daily, any time
                </li>
                <li>
                  • <strong>Dosage:</strong> 3-5g per day
                </li>
                <li>
                  • <strong>Loading:</strong> Optional 20g/day for 5 days
                </li>
              </ul>
            </div>
            <div className="p-3 transition-all duration-300 border rounded-lg cursor-pointer hover:shadow-md custom-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Recovery</Badge>
                <h4 className="text-sm font-semibold">🌙 Magnesium</h4>
              </div>
              <p className="mb-2 text-xs text-muted-foreground">
                Supports muscle function and sleep quality
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  • <strong>Timing:</strong> Evening before bed
                </li>
                <li>
                  • <strong>Dosage:</strong> 200-400mg
                </li>
                <li>
                  • <strong>Benefits:</strong> Reduces cramps, better sleep
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 transition-all duration-300 border rounded-lg cursor-pointer hover:shadow-md custom-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Energy</Badge>
                <h4 className="text-sm font-semibold">☕ Pre-Workout</h4>
              </div>
              <p className="mb-2 text-xs text-muted-foreground">
                Boosts energy and focus for training
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  • <strong>Timing:</strong> 15-30 minutes before workout
                </li>
                <li>
                  • <strong>Key ingredients:</strong> Caffeine, Beta-Alanine
                </li>
                <li>
                  • <strong>Caution:</strong> Start with half dose to assess
                  tolerance
                </li>
              </ul>
            </div>
            <div className="p-3 transition-all duration-300 border rounded-lg cursor-pointer hover:shadow-md custom-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Health</Badge>
                <h4 className="text-sm font-semibold">🐟 Omega-3</h4>
              </div>
              <p className="mb-2 text-xs text-muted-foreground">
                Reduces inflammation and supports recovery
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  • <strong>Timing:</strong> With meals
                </li>
                <li>
                  • <strong>Dosage:</strong> 1-3g EPA/DHA daily
                </li>
                <li>
                  • <strong>Sources:</strong> Fish oil, Algae oil
                </li>
              </ul>
            </div>
            <div className="p-3 transition-all duration-300 border rounded-lg cursor-pointer hover:shadow-md custom-shadow">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Foundation</Badge>
                <h4 className="text-sm font-semibold">💊 Multivitamin</h4>
              </div>
              <p className="mb-2 text-xs text-muted-foreground">
                Fills nutritional gaps in your diet
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>
                  • <strong>Timing:</strong> With breakfast
                </li>
                <li>
                  • <strong>Focus:</strong> B-vitamins, Vitamin D, Zinc
                </li>
                <li>
                  • <strong>Note:</strong> Choose high-quality brands
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
