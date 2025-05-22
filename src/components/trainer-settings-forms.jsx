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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

export function TrainerSettingsForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [speciality, setSpeciality] = useState("");
  const [bio, setBio] = useState("");
  const [certifications, setCertifications] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");

  const trainingPreferences = [
    { id: "bodybuilding", label: "Bodybuilding" },
    { id: "yoga", label: "Yoga" },
    { id: "crossfit", label: "CrossFit" },
    { id: "pilates", label: "Pilates" },
    { id: "cardio", label: "Cardio" },
    { id: "strength", label: "Strength Training" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      birth_date: birthDate ? format(birthDate, "yyyy-MM-dd") : null,
      speciality,
      bio,
      certifications,
      years_experience: yearsExperience,

      if(certifications) {
        formData.append("certifications", certifications);
      },
    };

    console.log("Trainer registration data:", formData);
    // Qui potresti inviare i dati a un'API o salvarli nel DB
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insert your data</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name + Last Name */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          {/* Speciality + Birth Date */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Speciality</Label>
              <Select onValueChange={setSpeciality}>
                <SelectTrigger>
                  <SelectValue placeholder="Select speciality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bodybuilding">Bodybuilding</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="crossfit">Crossfit</SelectItem>
                  <SelectItem value="pilates">Pilates</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="hiit">HIIT</SelectItem>
                  <SelectItem value="functional">
                    Functional Training
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Birth Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !birthDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {birthDate ? format(birthDate, "PPP") : "Select birth date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short trainer biography"
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="certifications">Certifications (PDF)</Label>
            <Input
              id="certifications"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setCertifications(file);
                }
              }}
            />
            {certifications && (
              <p className="text-sm text-muted-foreground">
                Selected file: {certifications.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Years of Experience</Label>
            <Input
              type="number"
              min="0"
              max="50"
              value={yearsExperience}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 2) {
                  setYearsExperience(value);
                }
              }}
              placeholder="e.g., 5"
            />
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
