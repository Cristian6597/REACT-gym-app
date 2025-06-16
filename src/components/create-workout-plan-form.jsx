import { useState, useEffect } from "react";
import { useAxios } from "@/context/AxiosProvider";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigLeft } from "lucide-react";

export function CreateWorkoutPlanForm() {
  const axios = useAxios();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [description, setDescription] = useState("");
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const storedUser = localStorage.getItem("user");
  const trainerId = storedUser ? JSON.parse(storedUser).id : null;

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/users?role=client");
        setClients(response.data);
      } catch (error) {
        console.error("Errore nel fetch dei clienti.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, [axios]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trainerId) {
      alert("Errore: utente non autenticato.");
      return;
    }

    try {
      const payload = {
        title,
        client_id: selectedClient,
        trainer_id: trainerId,
        general_notes: description,
      };

      const response = await axios.post("/api/workout-plans", payload);
      navigate(`/workout-plans/${response.data.id}/add-exercises`);
    } catch (error) {
      if (error.response?.status === 422) {
        alert(
          "Errore di validazione: " + JSON.stringify(error.response.data.errors)
        );
      } else {
        alert("Errore durante il salvataggio del piano.");
      }
    }
  };

  const selectedClientData = clients.find(
    (client) => client.id.toString() === selectedClient
  );

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-6 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Generali</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Titolo del Piano</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="es. Piano Forza Superiore"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="client">Cliente</Label>
                <Select
                  value={selectedClient}
                  onValueChange={(val) => setSelectedClient(val)}
                  required
                  disabled={isLoading || clients.length === 0}
                >
                  <SelectTrigger id="client">
                    {selectedClientData ? (
                      <SelectValue>
                        {selectedClientData.first_name}{" "}
                        {selectedClientData.last_name}
                      </SelectValue>
                    ) : (
                      <SelectValue
                        placeholder={
                          isLoading
                            ? "Caricamento clienti..."
                            : "Seleziona un cliente"
                        }
                      />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <SelectItem value="loading" disabled key="loading">
                        Caricamento clienti...
                      </SelectItem>
                    ) : clients.length === 0 ? (
                      <SelectItem value="no-client" disabled key="no-client">
                        Nessun cliente disponibile
                      </SelectItem>
                    ) : (
                      clients.map((client) => (
                        <SelectItem
                          key={`client-${client.id}`}
                          value={client.id.toString()}
                        >
                          {client.first_name} {client.last_name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrizione del piano di allenamento"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link to="/">
                <Button type="button" variant="outline">
                  <ArrowBigLeft className="w-4 h-4 mr-2" />
                  Indietro
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading || !selectedClient}>
                Salva e aggiungi esercizi
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
