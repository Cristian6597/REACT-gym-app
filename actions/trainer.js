"use server"

import { TrainerFormSchema } from "@/lib/definitions";

export async function registerTrainer(state, formData) {
  // Validazione dei campi del form
  const validatedFields = TrainerFormSchema.safeParse({
    phone: formData.get("phone"),
    birth_date: formData.get("birth_date"),
    specialty: formData.get("specialty"),
    bio: formData.get("bio"),
    certifications: formData.get("certifications"),
    years_experience: formData.get("years_experience"),
  })

  // Se i campi non sono validi, restituisci gli errori
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Qui dovresti fare la chiamata API al tuo backend Laravel
    // const response = await fetch('/api/trainers', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     ...validatedFields.data,
    //     user_id: getCurrentUserId(), // Ottieni l'ID dell'utente corrente
    //   }),
    // })

    // Simulazione di successo
    console.log("Dati trainer validati:", validatedFields.data)

    return {
      message: "Registrazione trainer completata con successo!",
    }
  } catch (error) {
    return {
      message: "Errore durante la registrazione del trainer.",
    }
  }
}
