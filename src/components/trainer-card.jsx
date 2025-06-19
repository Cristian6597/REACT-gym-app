"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function TrainerCard({
  trainers,
  currentIndex,
  onPrev,
  onNext,
  placeholder,
}) {
  const currentTrainer = trainers[currentIndex];

  return (
    <Card className="min-h-[50vh] flex flex-col md:flex-row items-center gap-4 p-4 dark:bg-[#18171B] hover:shadow-lg custom-shadow transition-all duration-300">
      <div className="relative flex flex-col items-center justify-center w-full md:w-1/3">
        <button
          onClick={onPrev}
          className="hidden md:flex absolute left-[-2rem] top-1/2 transform -translate-y-1/2 px-12 py-2 text-2xl rounded-full hover:bg-gray-200 transition"
          aria-label="Previous trainer"
        >
          ←
        </button>

        <img
          src={placeholder || "/placeholder.svg"}
          alt={`${currentTrainer?.first_name} ${currentTrainer?.last_name}`}
          className="object-cover w-32 h-32 rounded-full shadow-lg md:w-40 md:h-40"
        />

        <div className="mt-4 font-semibold text-center">
          {currentTrainer?.first_name} {currentTrainer?.last_name}
        </div>

        <Link to="/message" className="w-full mt-2 md:w-auto">
          <Button
            variant="outline"
            className="flex items-center justify-center w-full gap-2 hover:text-[#FF3F3F] hover:border-[#FF3F3F] transition-colors bg-transparent shadow-none"
          >
            <MessageCircle className="w-4 h-4 text-gray-500 hover:text-[#FF3F3F]" />
            <span className="hidden sm:inline">Chat with trainer</span>
            <span className="sm:hidden">Chat</span>
          </Button>
        </Link>

        <div className="flex gap-4 mt-4 md:hidden">
          <button
            onClick={onPrev}
            className="px-4 py-2 text-xl transition rounded-full hover:bg-gray-200"
            aria-label="Previous trainer"
          >
            ←
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 text-xl transition rounded-full hover:bg-gray-200"
            aria-label="Next trainer"
          >
            →
          </button>
        </div>

        <button
          onClick={onNext}
          className="hidden md:flex absolute right-[-2rem] top-1/2 transform -translate-y-1/2 px-12 py-2 text-2xl rounded-full hover:bg-gray-200 transition"
          aria-label="Next trainer"
        >
          →
        </button>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full">
        <CardHeader>
          <CardTitle>
            {currentTrainer?.user?.first_name} {currentTrainer?.user?.last_name}
          </CardTitle>
          <CardDescription>
            Select from our list of professional trainers to help you reach your
            fitness goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Browse through our trainers' profiles and pick the one that fits
            your style and preferences.
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Specialty:</strong> {currentTrainer?.specialty || "N/A"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {currentTrainer?.bio || "No description available."}
            </p>
            <p>
              <strong>Experience:</strong> {currentTrainer?.years_experience}{" "}
              years
            </p>
            <p>
              <strong>Email:</strong> {currentTrainer?.email}
            </p>
            <p>
              <strong>Phone:</strong> {currentTrainer?.phone || "Not provided"}
            </p>
            <p>
              <strong>Birth Date:</strong>{" "}
              {currentTrainer?.birth_date || "Unknown"}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
