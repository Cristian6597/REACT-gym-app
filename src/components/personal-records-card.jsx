import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Edit } from "lucide-react";
import { useAxios } from "@/context/AxiosProvider";
import { useUser } from "@/context/UserProvider";

export function PersonalRecordsCard() {
  const { user } = useUser();
  const axios = useAxios();

  function usePersonalRecords() {
    const [personalRecords, setPersonalRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!user?.id) {
        setPersonalRecords([]);
        setLoading(false);
        return;
      }

      const fetchPR = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`/api/personal-records`);
          setPersonalRecords(res.data || []);
          setError(null);
        } catch (err) {
          setError(err);
          setPersonalRecords([]);
        } finally {
          setLoading(false);
        }
      };

      fetchPR();
    }, [user?.id]);

    // Add PR (non serve inviare user_id, il backend lo associa dal token)
    const addPR = async (payload) => {
      const res = await axios.post("/api/personal-records", payload);
      setPersonalRecords((prev) => [res.data, ...prev]);
    };

    // Update PR
    const updatePR = async (id, payload) => {
      const res = await axios.put(`/api/personal-records/${id}`, payload);
      setPersonalRecords((prev) =>
        prev.map((pr) => (pr.id === id ? res.data : pr))
      );
    };

    // Delete PR
    const deletePR = async (id) => {
      await axios.delete(`/api/personal-records/${id}`);
      setPersonalRecords((prev) => prev.filter((pr) => pr.id !== id));
    };

    return { personalRecords, loading, error, addPR, updatePR, deletePR };
  }

  const { personalRecords, loading, error, addPR, updatePR, deletePR } =
    usePersonalRecords();

  const [editingPR, setEditingPR] = useState(null);
  const [formData, setFormData] = useState({
    exercise: "",
    weight: "",
    reps: "",
    date: "",
  });

  const onEditPR = (pr) => {
    setEditingPR(pr || null);
    setFormData({
      exercise: pr?.exercise || "",
      weight: pr?.weight || "",
      reps: pr?.reps || "",
      date: pr ? pr.date.split("T")[0] : "",
    });
  };

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      exercise: formData.exercise,
      weight: parseFloat(formData.weight),
      reps: parseInt(formData.reps, 10),
      date: formData.date,
    };

    try {
      if (editingPR) {
        await updatePR(editingPR.id, payload);
      } else {
        await addPR(payload);
      }
      onEditPR(null);
    } catch (error) {
      alert("Errore nel salvare il personal record");
      console.error(error);
    }
  };

  const onDelete = async (id) => {
    if (confirm("Sei sicuro di voler cancellare questo personal record?")) {
      await deletePR(id);
      setEditingPR(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Errore nel caricamento: {error.message}</p>;

  return (
    <Card className="dark:bg-[#18171B] hover:shadow-lg custom-shadow transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Personal Records
        </CardTitle>
      </CardHeader>
      <CardContent>
        {personalRecords.length === 0 && !editingPR && (
          <p className="py-4 text-center text-muted-foreground">
            No personal records yet. Add your first PR!
          </p>
        )}

        {editingPR !== null && (
          <form onSubmit={onSubmit} className="mb-4 space-y-3">
            <input
              name="exercise"
              placeholder="Exercise"
              value={formData.exercise}
              onChange={onChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="weight"
              type="number"
              step="0.1"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={onChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="reps"
              type="number"
              placeholder="Reps"
              value={formData.reps}
              onChange={onChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={onChange}
              required
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                variant="primary"
                className="flex-1 custom-shadow"
              >
                {editingPR ? "Update" : "Add"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setEditingPR(null)}
              >
                Cancel
              </Button>
              {editingPR && (
                <Button
                  type="button"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => onDelete(editingPR.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          </form>
        )}

        <div className="space-y-3">
          {personalRecords
            .filter((pr) => pr !== undefined && pr !== null)
            .map((pr) => (
              <div
                key={pr.id}
                className="flex items-center justify-between p-3 transition-all duration-300 border rounded-lg hover:shadow-md custom-shadow"
              >
                <div>
                  <h4 className="font-medium">{pr.exercise}</h4>
                  <p className="text-sm text-muted-foreground">
                    {pr.weight}kg × {pr.reps} reps
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(pr.date).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onEditPR(pr)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
