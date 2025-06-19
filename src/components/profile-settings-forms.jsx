"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAxios } from "@/context/AxiosProvider";

const trainingPreferences = [
  { id: "cardio", label: "Cardio" },
  { id: "hiit", label: "HIIT" },
  { id: "pilates", label: "Pilates" },
  { id: "strength", label: "Strength Training" },
  { id: "weight-loss", label: "Weight Loss" },
  { id: "yoga", label: "Yoga" },
  { id: "crossfit", label: "CrossFit" },
  { id: "functional", label: "Functional Training" },
];

export function ProfileSettingsForm() {
  const [date, setDate] = useState();
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState("");
  const [preferences, setPreferences] = useState([]);
  const { toast } = useToast();
  const axios = useAxios();

  function handlePreferenceChange(id, checked) {
    if (checked) {
      setPreferences([...preferences, id]);
    } else {
      setPreferences(preferences.filter((item) => item !== id));
    }
  }

  const genderMap = {
    male: "M",
    female: "F",
    other: "Other",
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      birth_date: date ? format(date, "yyyy-MM-dd") : null,
      gender: genderMap[gender] ?? null,
      height_cm: parseInt(height),
      weight_kg: weight ? parseFloat(weight) : null,
      fitness_goals: fitnessGoals,
      training_preferences: preferences.join(","),
    };

    try {
      await axios.post("/api/client-profiles", formData);
      toast({
        title: "Profile Saved",
        description: "Your profile was successfully created!",
      });
      handleReset();
    } catch (error) {
      console.log("Submitting gender:", gender);
      console.log("Mapped gender:", genderMap[gender]);

      console.error("Error creating profile:", error);
      console.log("Response data:", error?.response?.data);
      toast({
        title: "Error",
        description: "There was a problem saving your profile.",
        variant: "destructive",
      });
    }
  }

  function handleReset() {
    setDate(undefined);
    setGender("male");
    setHeight("");
    setWeight("");
    setFitnessGoals("");
    setPreferences([]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Birth Date */}
          <div className="space-y-2">
            <Label>Birth Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {date ? format(date, "PPP") : "Select your birth date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(d) => d > new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={gender}
              onValueChange={setGender}
              className="flex flex-row space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Height */}
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* Fitness Goals */}
          <div className="space-y-2">
            <Label htmlFor="goals">Fitness Goals</Label>
            <Textarea
              id="goals"
              placeholder="Describe your fitness goals"
              className="min-h-[100px]"
              value={fitnessGoals}
              onChange={(e) => setFitnessGoals(e.target.value)}
            />
          </div>

          {/* Training Preferences */}
          <div className="space-y-3">
            <Label>Training Preferences</Label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {trainingPreferences.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={item.id}
                    checked={preferences.includes(item.id)}
                    onCheckedChange={(checked) =>
                      handlePreferenceChange(item.id, checked)
                    }
                  />
                  <Label htmlFor={item.id}>{item.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <CardFooter className="flex justify-between pt-6">
            <Link to="/">
              <Button variant="outline">Back</Button>
            </Link>
            <Button type="submit">Save Profile</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
