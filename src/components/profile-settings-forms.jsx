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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data for trainers
const trainers = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Johnson" },
  { id: "3", name: "Michael Williams" },
  { id: "4", name: "Emma Brown" },
  { id: "5", name: "David Miller" },
];

// Training preferences options
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
  const [trainerId, setTrainerId] = useState("");
  const [height, setHeight] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState("");
  const [preferences, setPreferences] = useState([]);
  const { toast } = useToast();

  function handlePreferenceChange(id, checked) {
    if (checked) {
      setPreferences([...preferences, id]);
    } else {
      setPreferences(preferences.filter((item) => item !== id));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      trainerId,
      birth_date: date ? format(date, "yyyy-MM-dd") : null,
      gender,
      height_cm: height,
      fitness_goals: fitnessGoals,
      training_preferences: preferences,
    };

    console.log(formData);
    return true; // Make sure this actually returns true
  }

  function handleReset() {
    setDate(undefined);
    setGender("male");
    setTrainerId("");
    setHeight("");
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
          {/* Trainer Selection */}
          <div className="space-y-2">
            <Label htmlFor="trainer">Trainer</Label>
            <Select value={trainerId} onValueChange={setTrainerId}>
              <SelectTrigger id="trainer">
                <SelectValue placeholder="Select a trainer" />
              </SelectTrigger>
              <SelectContent>
                {trainers.map((trainer) => (
                  <SelectItem key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Select your preferred personal trainer.
            </p>
          </div>

          {/* Birth Date */}
          <div className="space-y-2">
            <Label>Birth Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
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
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
            <p className="text-sm text-muted-foreground">
              Your date of birth helps us customize your fitness plan.
            </p>
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
                <Label htmlFor="male" className="font-normal">
                  Male
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="font-normal">
                  Female
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="font-normal">
                  Other
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Height */}
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height in centimeters"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Your height helps us calculate your fitness metrics.
            </p>
          </div>

          {/* Fitness Goals */}
          <div className="space-y-2">
            <Label htmlFor="goals">Fitness Goals</Label>
            <Textarea
              id="goals"
              placeholder="Describe your fitness goals and what you want to achieve"
              className="min-h-[100px]"
              value={fitnessGoals}
              onChange={(e) => setFitnessGoals(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Tell us what you want to achieve with your fitness journey.
            </p>
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
                  <Label htmlFor={item.id} className="font-normal">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Select the types of training you prefer or are interested in.
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to="/">
          <Button variant="outline">Back</Button>
        </Link>
        <Link to="/">
          <Button type="submit">Save Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
