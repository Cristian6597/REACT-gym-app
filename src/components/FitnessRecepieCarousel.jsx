import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Recipe data
const fitnessRecipes = [
  {
    id: 1,
    title: "Protein Pancakes",
    description: "High protein, low carb pancakes perfect for post-workout.",
    calories: 320,
    protein: "24g",
    image:
      "https://www.kulickspancakerecipes.com/wp-content/uploads/2022/03/Protein-pancake-recipe.jpg",
  },
  {
    id: 2,
    title: "Greek Yogurt Bowl",
    description: "Protein-rich yogurt with berries and honey.",
    calories: 280,
    protein: "18g",
    image:
      "https://usa.fage/sites/usa.fage/files/Fage_Recipe_Tiles_B_600x420_Apr21_Plain_Loaded_BowlsA_Hero_1291_RGB.jpg",
  },
  {
    id: 3,
    title: "Chicken Quinoa Salad",
    description: "Lean protein with complex carbs and veggies.",
    calories: 350,
    protein: "28g",
    image:
      "https://emilybites.com/wp-content/uploads/2018/01/Greek-Chicken-Quinoa-Salad-3b-620x827.jpg",
  },
  {
    id: 4,
    title: "Salmon & Avocado",
    description: "Omega-3 rich salmon with healthy fats.",
    calories: 420,
    protein: "32g",
    image:
      "https://gimmedelicious.com/wp-content/uploads/2021/09/Grilled-Salmon-with-avocado-Salsa-sq.jpg",
  },
  {
    id: 5,
    title: "Protein Smoothie",
    description: "Quick and easy post-workout recovery drink.",
    calories: 240,
    protein: "20g",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/pvn100120smoothies-002-1657806746.jpg?crop=0.8xw:1xh;center,top&resize=980:*",
  },
  {
    id: 6,
    title: "Turkey Wrap",
    description: "Lean protein with whole grains and veggies.",
    calories: 310,
    protein: "26g",
    image:
      "https://nutritiontofit.com/wp-content/uploads/2023/12/Pesto-Turkey-Wrap.jpg",
  },
];

export function FitnessRecepieCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const totalItems = fitnessRecipes.length;
  const visibleItems = 3;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 3000); // autoplay ogni 3 secondi

    return () => clearInterval(intervalRef.current);
  }, [totalItems]);

  return (
    <div className="w-full max-w-5xl px-4 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-center">Fitness Recipes</h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent
          className="-ml-2 transition-transform duration-700 ease-in-out md:-ml-4"
          style={{
            transform: `translateX(-${
              (currentIndex % totalItems) * (100 / visibleItems)
            }%)`,
          }}
        >
          {fitnessRecipes.map((recipe) => (
            <CarouselItem key={recipe.id} className="pl-2 md:pl-4 md:basis-1/3">
              <Card className="overflow-hidden">
                <div className="relative w-full h-48">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{recipe.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {recipe.description}
                  </p>
                  <div className="flex justify-between mt-3 text-sm">
                    <span className="font-medium">{recipe.calories} cal</span>
                    <span className="font-medium">
                      {recipe.protein} protein
                    </span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalItems }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === i ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </Carousel>
    </div>
  );
}
