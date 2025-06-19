import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Calendar,
  Phone,
  Award,
  FileText,
  Star,
  Edit3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAxios } from "@/context/AxiosProvider";
import { useUser } from "@/context/UserProvider";

export default function TrainerProfileSettings() {
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
        // Cambiato endpoint per trainer profiles
        const { data } = await axios.get(`/api/trainers/${user.id}`);

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
          to="/edit_trainer_profile"
          className="inline-block mt-4 text-blue-500 underline"
        >
          Create your profile
        </Link>
      </div>
    );
  }

  const {
    phone,
    birth_date,
    specialty,
    bio,
    certifications,
    years_experience,
    user: { first_name, last_name, email } = {},
  } = profile;

  const formattedBirthDate = birth_date
    ? new Date(birth_date).toLocaleDateString()
    : "-";

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={profile.avatar_url || "../assets/placeholder1.jpg"}
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
                <p className="mt-1 text-gray-300">Trainer Profile</p>
                <div className="flex justify-center mt-4 sm:justify-start">
                  <Link to="/edit_trainer_profile">
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
              <InfoRow icon={<Phone />} label="Phone" value={phone} />
              <Separator />
              <InfoRow
                icon={<Calendar />}
                label="Birth Date"
                value={formattedBirthDate}
              />
              <Separator />
              <InfoRow icon={<Award />} label="Specialty" value={specialty} />
              <Separator />
              <InfoRow
                icon={<Star />}
                label="Experience (years)"
                value={years_experience}
              />
            </CardContent>
          </Card>

          {/* Certifications & Bio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Certifications & Bio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-600">
                  Certifications
                </h3>
                <p className="text-gray-700">
                  {certifications || "No certifications provided"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600">Bio</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {bio || "No bio provided"}
                </p>
              </div>
            </CardContent>
          </Card>
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
