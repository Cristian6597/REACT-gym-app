"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export function FitnessStatsCard({
  icon: Icon,
  title,
  value,
  progress,
  buttonText,
  onButtonClick,
  description,
}) {
  return (
    <Card className="dark:bg-[#18171B] hover:shadow-lg custom-shadow transition-all duration-300 cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {progress && <Progress value={progress} className="mt-2" />}
        {buttonText && (
          <Button
            size="sm"
            className="mt-2 w-full dark:bg-[#FF3F3F] text-white font-semibolds"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
        {description && (
          <p className="mt-2 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
