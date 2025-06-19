import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Calendar,
  Users,
  Ruler,
  Target,
  Dumbbell,
  Edit3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAxios } from "@/context/AxiosProvider";
import { useUser } from "@/context/UserProvider";

export default function ClientProfile() {
  const axios = useAxios();
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user?.id) {
        setLoading(false);
        setError("User not authenticated");
        return;
      }

      try {
        const { data } = await axios.get(`/api/client-profiles/${user.id}`);

        // data has the shape { profile: {...}, user: {...} }
        setProfile({
          ...data.profile,
          user: data.user,
        });
      } catch (error) {
        console.error("Error loading profile:", error);
        setError("Error loading profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [axios, user?.id]);

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500">Loading profile...</div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 text-center text-red-500">
        {error}{" "}
        {!user?.id && (
          <Link to="/login" className="text-blue-500">
            Log in
          </Link>
        )}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mt-10 text-center">
        <h1 className="text-2xl font-semibold">
          {user?.first_name} {user?.last_name}
        </h1>
        <p className="mt-2 text-red-500">Profile not found.</p>
        <Link
          to="/edit_client_profile"
          className="inline-block mt-4 text-blue-500 underline"
        >
          Create your profile
        </Link>
      </div>
    );
  }

  // Extract data from profile and user
  const {
    birth_date,
    gender,
    height_cm,
    fitness_goals,
    training_preferences,
    avatar_url,
    user: { first_name, last_name, email } = {},
  } = profile;

  // Format data
  const goalsArray = fitness_goals ? fitness_goals.split(",") : [];
  const prefsArray = training_preferences
    ? training_preferences.split(",")
    : [];
  const formattedBirthDate = birth_date
    ? new Date(birth_date).toLocaleDateString()
    : "-";
  const formattedHeight = height_cm ? `${height_cm} cm` : "-";

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={avatar_url || "../assets/placeholder1.jpg"}
                  alt="Profile"
                />
                <AvatarFallback className="text-xl font-semibold bg-blue-100">
                  {first_name?.[0]}
                  {last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold">
                  {first_name} {last_name}
                </h1>
                <p className="mt-1 text-gray-300">Active member</p>
                <div className="flex justify-center mt-4 sm:justify-start">
                  <Link to="/edit_client_profile">
                    <Button className="gap-2">
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoRow icon={<Mail />} label="Email" value={email} />
              <Separator />
              <InfoRow
                icon={<Calendar />}
                label="Birth Date"
                value={formattedBirthDate}
              />
              <Separator />
              <InfoRow icon={<Users />} label="Gender" value={gender} />
              <Separator />
              <InfoRow
                icon={<Ruler />}
                label="Height"
                value={formattedHeight}
              />
            </CardContent>
          </Card>

          {/* Fitness Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Fitness Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-gray-500">Your goals</p>
              <div className="flex flex-wrap gap-2">
                {goalsArray.length > 0 ? (
                  goalsArray.map((goal, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-green-800 bg-green-100 dark:bg-green-200 dark:text-green-900"
                    >
                      {goal.trim()}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-400">No goals set</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-orange-600" />
              Training Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-gray-500">
              Preferred types of training
            </p>
            <div className="flex flex-wrap gap-2">
              {prefsArray.length > 0 ? (
                prefsArray.map((pref, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-orange-700 border-orange-200"
                  >
                    {pref.trim()}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-400">No preferences set</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end"></CardFooter>
        </Card>
        <div className="flex justify-end">
          <Link to="/">
            <Button variant="outline" className="hover:bg-[#ff3f3f80]">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 text-gray-500">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value || "-"}</p>
      </div>
    </div>
  );
}
