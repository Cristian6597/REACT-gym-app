import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Phone,
  Calendar,
  Award,
  BookOpen,
  Clock,
  Edit,
  Trash2,
} from "lucide-react";

export default function TrainerProfile() {
  const { trainer, loading, error, deleteProfile } = useTrainer();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      window.confirm("Sei sicuro di voler eliminare il tuo profilo trainer?")
    ) {
      setIsDeleting(true);
      const result = await deleteProfile();

      if (result.success) {
        alert("Profilo eliminato con successo");
      } else {
        alert(result.message || "Errore nell'eliminazione");
      }
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <Skeleton className="w-48 h-8" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-full h-20" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!trainer) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <p>Nessun profilo trainer trovato</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <CardTitle>Profilo Trainer</CardTitle>
            <p className="text-sm text-muted-foreground">ID: {trainer.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Modifica
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isDeleting ? "Eliminando..." : "Elimina"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Informazioni di contatto */}
        {trainer.phone && (
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <span>{trainer.phone}</span>
          </div>
        )}

        {trainer.birth_date && (
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span>
              {new Date(trainer.birth_date).toLocaleDateString("it-IT")}
            </span>
          </div>
        )}

        {/* Specialità */}
        {trainer.specialty && (
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-muted-foreground" />
            <Badge variant="secondary">{trainer.specialty}</Badge>
          </div>
        )}

        {/* Anni di esperienza */}
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <span>{trainer.years_experience} anni di esperienza</span>
        </div>

        {/* Certificazioni */}
        {trainer.certifications && (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Certificazioni</span>
            </div>
            <p className="ml-8 text-sm text-muted-foreground">
              {trainer.certifications}
            </p>
          </div>
        )}

        {/* Bio */}
        {trainer.bio && (
          <div className="space-y-2">
            <h3 className="font-medium">Biografia</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {trainer.bio}
            </p>
          </div>
        )}

        {/* Date di creazione e aggiornamento */}
        <div className="pt-4 text-xs border-t text-muted-foreground">
          <p>Creato: {new Date(trainer.created_at).toLocaleString("it-IT")}</p>
          <p>
            Aggiornato: {new Date(trainer.updated_at).toLocaleString("it-IT")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
